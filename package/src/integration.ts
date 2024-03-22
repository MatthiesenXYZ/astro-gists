import { defineIntegration, createResolver } from "astro-integration-kit"
import { corePlugins } from "astro-integration-kit/plugins"
import type { astroGistsUserConfig } from "./index"
import { readFileSync } from "node:fs";
import type { AstroIntegrationLogger } from "astro";
import { loadEnv } from "vite";
import { z } from "astro/zod";

// Load environment variables
const { GITHUB_PERSONAL_TOKEN } = loadEnv("all", process.cwd(), "GITHUB_");

// Check if there is a GitHub Personal Token
export const isThereAToken = () => {
    if (!GITHUB_PERSONAL_TOKEN) {
      return false;
    }
    return true;
  }
  
// Error message if the token is missing
export const TOKEN_MISSING_ERROR = "GITHUB_PERSONAL_TOKEN not found. Please add it to your .env file. Without it, you will be limited to 60 requests per hour.";
  
/** 
 * Astro-Gist - An Astro.js integration for embedding GitHub Gists in your Astro.js project.
*/
export default defineIntegration({
  name: "@matthiesenxyz/astro-gists",
  optionsSchema: z.custom<astroGistsUserConfig>().optional().default({ verbose: false }),
  plugins: [...corePlugins],
  setup({ options }) {
	// Create resolve helper
	const { resolve } = createResolver(import.meta.url);

	// Check if verbose logging is enabled
	const isVerbose = options.verbose;
	
	// Create Gist Logger interface
	const gistLogger = async (
		logger: AstroIntegrationLogger, 
		type: "info"|"warn"|"error", 
		message: string,
		checkVerbose: boolean,
		) => {
			// if checkVerbose is true and isVerbose is true, log the message
			if (!checkVerbose || checkVerbose && isVerbose) {
				if (type === "info") {
					logger.info(message);
				} else if (type === "warn") {
					logger.warn(message);
				} else if (type === "error") {
					logger.error(message);
				} 
			}
		};

	return {
	  "astro:config:setup": ({ 
		watchIntegration, addVirtualImports, logger, addDts
	}) => {

		// Create a logger for the setup events
		const configLogger = logger.fork("astro-gists : setup");
		const configDone = logger.fork("astro-gists : setup-done")

		gistLogger(configLogger, "info", "Setting up Astro Gists Integration.", false);

		gistLogger(configLogger, "warn", "Verbose logging is enabled.", true);

		// WATCH INTEGRATION FOR CHANGES
		watchIntegration(resolve())

		// Check for GITHUB_PERSONAL_TOKEN
		if (!isThereAToken()) {
			gistLogger(configLogger,"error",TOKEN_MISSING_ERROR, false)
		}

		// Add virtual imports
		gistLogger(configLogger, "info", "Adding virtual imports.", true);
		addVirtualImports({
			"virtual:astro-gists/config": `export default ${JSON.stringify(options)}`,
			"astro-gists:components": `export * from "@matthiesenxyz/astro-gists/components";`
		});

		// Add .d.ts file
		gistLogger(configLogger, "info", "Injecting astro-gists.d.ts file.", true);
		addDts({
			name: "astro-gists",
			content: readFileSync(resolve("./stubs/astro-gists.d.ts"), "utf-8")
		})

		// Log that the configuration is complete
		gistLogger(
			configDone, 
			"info", 
			"Configuration for Astro Gists Integration is complete.", 
			false
		);
	  },
	}
  }
})
