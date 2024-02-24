import { defineIntegration, createResolver } from "astro-integration-kit"
import { corePlugins } from "astro-integration-kit/plugins"

export default defineIntegration({
  name: "@matthiesenxyz/astro-gists",
  plugins: [...corePlugins],
  setup() {
	const { resolve } = createResolver(import.meta.url);
	return {
	  "astro:config:setup": ({ watchIntegration }) => {
		watchIntegration(resolve())
	  }
	}
  }
})
