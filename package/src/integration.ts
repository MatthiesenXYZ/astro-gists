import { defineIntegration, createResolver } from "astro-integration-kit"
import { corePlugins } from "astro-integration-kit/plugins"
import { isThereAToken, TOKEN_MISSING_ERROR } from "./lib"
import { optionsSchema } from "./index"

/** 
 * Astro-Gist - An Astro.js integration for embedding GitHub Gists in your Astro.js project.
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
		if (!isThereAToken) {configSetup.warn(TOKEN_MISSING_ERROR)}

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
