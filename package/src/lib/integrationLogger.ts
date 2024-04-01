import type { AstroIntegrationLogger } from "astro";

// Create Gist Logger interface
export const gistLogger = async (
	logger: AstroIntegrationLogger, 
    isVerbose: boolean,
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