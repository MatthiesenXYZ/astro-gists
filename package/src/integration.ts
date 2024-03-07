import { defineIntegration, createResolver } from "astro-integration-kit"
import { corePlugins } from "astro-integration-kit/plugins"
import { z } from "astro/zod";
import { loadEnv } from "vite";
import { type BundledShikiTheme } from 'expressive-code'

// Load environment variables
const { GITHUB_PERSONAL_TOKEN } = loadEnv("all", process.cwd(), "GITHUB_");

export const optionsSchema = z.object({
	/** 
	 * Optional: Allows the user to change the default theme for the code blocks.
	 * 
	 * All available themes are listed in the [Shiki documentation](https://shiki.matsu.io/docs/themes).
	 */
	theme: z.custom<BundledShikiTheme>().optional(),
  });

export type UserConfig = z.infer<typeof optionsSchema>

/** Astro-Gist - An Astro.js integration for embedding GitHub Gists in your Astro.js project.
 * @example
 * import { defineConfig } from "astro/config";
 * import astroGist from "@matthiesenxyz/astro-gists";
 * 
 * export default defineConfig({
 *   integrations: [ 
 *     astroGist({
 *       // Optional: Change the default theme for the code blocks. 
 *       // Default: `Astro Houston (Custom)` If you want to use the default theme, you can omit this option. 
 *       theme: "github-dark" 
 *     }) 
 *   ]
 * });
*/
export default defineIntegration({
  name: "@matthiesenxyz/astro-gists",
  optionsSchema,
  plugins: [...corePlugins],
  setup({ options }) {
	const { resolve } = createResolver(import.meta.url)

	return {
	  "astro:config:setup": ({ 
		watchIntegration, addVirtualImports, logger,
	}) => {
		logger.info("Setting up Astro Gists Integration.")
		const configSetup = logger.fork("astro-gists/config:setup")
		
		// WATCH INTEGRATION FOR CHANGES
		watchIntegration(resolve())

		// Check for GITHUB_PERSONAL_TOKEN
		if (!GITHUB_PERSONAL_TOKEN) {
			configSetup.warn("GITHUB_PERSONAL_TOKEN not found. Please add it to your .env file. Without it, you will be limited to 60 requests per hour.")
		}

		// Add virtual imports
		addVirtualImports({
			"virtual:astro-gists/config": `export default ${JSON.stringify(options)}`,
		});

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
