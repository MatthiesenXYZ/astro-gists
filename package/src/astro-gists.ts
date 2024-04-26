import { defineIntegration, addDts, addVirtualImports } from "astro-integration-kit";
import type { astroGistsUserConfig } from "./schemas/UserConfigSchema";
import { loadEnv } from "vite";
import { z } from "astro/zod";
import { gistLogger } from "./lib/integrationLogger";
import { fileFactory } from "./lib/file-factory";

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
  setup({ name, options }) {
	return {
		hooks: {
			"astro:config:setup": ( params ) => {

				const { verbose } = options;
				const { logger } = params;
		
				// Create a logger for the setup events
				const configLogger = logger.fork("astro-gists : setup");
				const configDone = logger.fork("astro-gists : setup-done")
		
				gistLogger(configLogger, verbose, "info", "Setting up Astro Gists Integration.", false);
		
				gistLogger(configLogger, verbose, "warn", "Verbose logging is enabled.", true);
		
				// Check for GITHUB_PERSONAL_TOKEN
				if (!isThereAToken()) {
					gistLogger(configLogger, verbose, "error",TOKEN_MISSING_ERROR, false)
				}
		
				// Add virtual imports
				gistLogger(configLogger, verbose,  "info", "Adding virtual imports.", true);
				addVirtualImports(params, {
					name,
					imports: {
					"virtual:astro-gists/config": `export default ${JSON.stringify(options)}`,
					"astro-gists:components": `export * from "@matthiesenxyz/astro-gists/components";`
				}});
		
				// Add .d.ts file
				gistLogger(configLogger, verbose,  "info", "Injecting astro-gists.d.ts file.", true);
		
				const gistsDTS = fileFactory();
		
				gistsDTS.addLines(`
					declare module "astro-gists:components" {
						export * from "@matthiesenxyz/astro-gists/components";
					}
				`)
		
				addDts(params, {
					name: "astro-gists",
					content: gistsDTS.text()
				})
		
				// Log that the configuration is complete
				gistLogger(
					configDone, 
					verbose, 
					"info", 
					"Configuration for Astro Gists Integration is complete.", 
					false
				);
		  	},
		}
	}
  }
})
