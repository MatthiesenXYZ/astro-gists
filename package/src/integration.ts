import { defineIntegration, createResolver } from "astro-integration-kit"
import { corePlugins } from "astro-integration-kit/plugins"
import { astroGistsExpressiveCode } from "./integrations/expressive-code"

/** Astro-Gist - Astro Integration
 * - There is currently no configuration for this integration. Just add it to your astro Integration list.
 * @example
 * import astroGist from "@matthiesenxyz/astro-gists";
 * export default defineConfig({
 *   integrations: [astroGist()]
 * });
*/
export default defineIntegration({
  name: "@matthiesenxyz/astro-gists",
  plugins: [...corePlugins],
  setup() {
	const { resolve } = createResolver(import.meta.url);

	return {
	  "astro:config:setup": ({ 
		watchIntegration, 
		config, 
		updateConfig, 
		logger
	 }) => {
		// WATCH INTEGRATION FOR CHANGES
		watchIntegration(resolve())

		// IMPORT INTEGRATIONS & INTEGRATION ROUTES
		const integrations = [...config.integrations];

		// ADD ASTRO-EXPRESSIVE-CODE INTEGRATION
		if (!integrations.find(({ name }) => name === "astro-expressive-code")) {
			logger.info("Adding astro-expressive-code integration")
			updateConfig({
				integrations: [...integrations, ...astroGistsExpressiveCode()]
			})
		} 

		// UPDATE ASTRO-EXPRESSIVE-CODE INTEGRATION
		try {
			updateConfig({
				integrations: [...astroGistsExpressiveCode()]
			})
		} catch (e) {
			logger.error(e as string);
			throw e;
		}
	  }
	}
  }
})
