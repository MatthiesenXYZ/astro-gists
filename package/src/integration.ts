import { defineIntegration, createResolver } from "astro-integration-kit"
import { corePlugins } from "astro-integration-kit/plugins"
import { astroGistsExpressiveCode } from "./integrations/expressive-code"


export default defineIntegration({
  name: "@matthiesenxyz/astro-gists",
  plugins: [...corePlugins],
  setup() {
	const { resolve } = createResolver(import.meta.url);
	return {
	  "astro:config:setup": ({ watchIntegration, config, updateConfig, logger }) => {
		watchIntegration(resolve())


		// IMPORT INTEGRATIONS & INTEGRATION ROUTES
		const integrations = [...config.integrations];

		if (!integrations.find(({ name }) => name === "astro-expressive-code")) {
			logger.info("Adding astro-expressive-code integration")
			updateConfig({
				integrations: [...integrations, ...astroGistsExpressiveCode()]
			})
		} 
	  }
	}
  }
})
