import { defineIntegration, createResolver } from "astro-integration-kit"
import { corePlugins } from "astro-integration-kit/plugins"
import { optionsSchema } from "./index"
import { readFileSync } from "node:fs";
import type { AstroIntegrationLogger } from "astro";
import { loadEnv } from "vite";

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
  optionsSchema,
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
			if (checkVerbose && isVerbose) {
				if (type === "info") {
					logger.info(message);
				} else if (type === "warn") {
					logger.warn(message);
				} else if (type === "error") {
					logger.error(message);
				} 
			}
			// if checkVerbose is false, force log the message
			if (!checkVerbose) {
				if (type === "info") {
					logger.info(message);
				} else if (type === "warn") {
					logger.warn(message);
				} else if (type === "error") {
					logger.error(message);
				} 
		} };

	return {
	  "astro:config:setup": ({ 
		watchIntegration, addVirtualImports, logger, addDts
	}) => {

		// Create a logger for the setup events
		const configLogger = logger.fork("astro-gists : setup");

		// Create a verbose logger
		const verboseLogger = (
			type: "info"|"warn"|"error", 
			message:string
			) => gistLogger(configLogger, type, message, true);

		// Create a logger that ignores the verbose check
		const ignoreVerboseLoggerCheck = (
			type: "info"|"warn"|"error",
			message:string
			) => gistLogger(configLogger, type, message, false);

		ignoreVerboseLoggerCheck("info", "Setting up Astro Gists Integration.");

		verboseLogger("warn","Verbose logging is enabled.")

		// WATCH INTEGRATION FOR CHANGES
		watchIntegration(resolve())

		// Check for GITHUB_PERSONAL_TOKEN
		if (!isThereAToken()) {
			ignoreVerboseLoggerCheck("warn",TOKEN_MISSING_ERROR)
		}

		// Add virtual imports
		verboseLogger("info", "Adding virtual imports.");
		addVirtualImports({
			"virtual:astro-gists/config": `export default ${JSON.stringify(options)}`,
			"astro-gists:components": `export * from "@matthiesenxyz/astro-gists/components";`
		});

		// Add .d.ts file
		verboseLogger("info", "Injecting astro-gists.d.ts file.");
		addDts({
			name: "astro-gists",
			content: readFileSync(resolve("./stubs/astro-gists.d.ts"), "utf-8")
		})

	  },
	  "astro:config:done": ({ logger }) => {
		// Create a logger for the config done event
		const configDone = logger.fork("astro-gists : setup-done")

		// Log that the configuration is complete
		gistLogger(
			configDone, 
			"info", 
			"Configuration for Astro Gists Integration is complete.", 
			false
		);

	  },
	  "astro:server:setup": ({ logger }) => {
		// Create a logger for the server setup event
		const serverSetup = logger.fork("astro-gists : dev")

		// Log that the server is being set up
		gistLogger(
			serverSetup,
			"info",
			"Setting up Astro Gists Integration for development.",
			true
		);
	  },
	  "astro:build:start": ({ logger }) => {
		// Create a logger for the build start event
		const buildStart = logger.fork("astro-gists : build")

		// Log that the build is starting
		gistLogger(
			buildStart,
			"info",
			"Starting Build for Astro Gists Integration.",
			true
		);
	  },
	  "astro:build:done": ({ logger }) => {
		// Create a logger for the build done event
		const buildDone = logger.fork("astro-gists : done")

		// Log that the build is complete
		gistLogger(
			buildDone,
			"info",
			"Build for Astro Gists Integration is complete.",
			true
		);
	  }
	}
  }
})
