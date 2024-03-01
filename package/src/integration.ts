import { defineIntegration, createResolver } from "astro-integration-kit"
import { corePlugins } from "astro-integration-kit/plugins"
import { astroGistsExpressiveCode } from "./integrations/expressive-code"
import { z } from "astro/zod";
import mdx from "@astrojs/mdx";
import { loadEnv } from "vite";

// Load environment variables
const { GITHUB_PERSONAL_TOKEN } = loadEnv("all", process.cwd(), "GITHUB_");

/** Astro-Gist - An Astro.js integration for embedding GitHub Gists in your Astro.js project.
 * @example
 * import { defineConfig } from "astro/config";
 * import astroGist from "@matthiesenxyz/astro-gists";
 * 
 * export default defineConfig({
 *   integrations: [ 
 *     astroGist({
 *       // Enable the Astrojs/MDX Integration - Default: true
 *       MDXIntegration: true 
 *     }) 
 *   ]
 * });
*/
export default defineIntegration({
  name: "@matthiesenxyz/astro-gists",
  optionsSchema: z.object({
	/** Enables the astrojs/mdx Integration */
	MDXIntegration: z.boolean().optional().default(true),
  }),
  plugins: [...corePlugins],
  setup({ options }) {
	const { resolve } = createResolver(import.meta.url)

	return {
	  "astro:config:setup": ({ 
		watchIntegration, hasIntegration, addIntegration,
		updateConfig, logger
	}) => {
		logger.info("Setting up Astro Gists Integration.")
		const configSetup = logger.fork("astro-gists/config:setup")
		
		// WATCH INTEGRATION FOR CHANGES
		watchIntegration(resolve())

		// Check for GITHUB_PERSONAL_TOKEN
		if (!GITHUB_PERSONAL_TOKEN) {
			configSetup.warn("GITHUB_PERSONAL_TOKEN not found. Please add it to your .env file. Without it, you will be limited to 60 requests per hour.")
		}

		// ADD ExpressiveCode INTEGRATION
		if (!hasIntegration("astro-expressive-code")) {
			configSetup.info("Loading Astro Gists Expressive Code Integration.")
			updateConfig({
				integrations: [...astroGistsExpressiveCode()]
			})
		} else {
			configSetup.info("Astro Expressive Code Integration already loaded.")
		}

		// ADD MDX INTEGRATION IF ENABLED
		if (options.MDXIntegration && hasIntegration("@astrojs/mdx")) {
			configSetup.warn("@astrojs/mdx Integration already loaded.In some cases this could cause issues. Please remove it from your astro.config.mjs file. as it will be added automatically.")
		}
		if (options.MDXIntegration && !hasIntegration("@astrojs/mdx")) {
			configSetup.info("Loading @astrojs/mdx Integration.")
			addIntegration(mdx(), { ensureUnique: true })
		}
		if (!options.MDXIntegration) {
			configSetup.info("Internal MDX Integration Disabled. Skipping...")
		}

		// UPDATE All integrations
		try {
			updateConfig({
				integrations: [...astroGistsExpressiveCode(), mdx()]
			})
		} catch (e) {
			logger.error(e as string);
			throw `@matthiesenxyz/astro-gists: Unable to Update Integrations...\n${e}`;
		}
	  },
	  "astro:config:done": ({ logger }) => {
		const configDone = logger.fork("astro-gists/config:done")
		configDone.info("Astro Gists Integration Loaded.")
	  },
	  "astro:server:setup": ({ logger }) => {
		const serverSetup = logger.fork("astro-gists/server:setup")
		serverSetup.info("Setting up Astro Gists Integration for Development.")
	  },
	  "astro:build:start": ({ logger }) => {
		const buildStart = logger.fork("astro-gists/build:start")
		buildStart.info("Building Astro Gists Integration.")
	  },
	  "astro:build:done": ({ logger }) => {
		const buildDone = logger.fork("astro-gists/build:done")
		buildDone.info("Astro Gists Integration Built.")
	  }
	}
  }
})
