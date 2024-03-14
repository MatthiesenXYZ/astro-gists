// Export Integration
import astroGist from "./integration";
export default astroGist;

// Export the user config schema
import { z } from "astro/zod";
import type { BundledShikiTheme } from "expressive-code";

export const optionsSchema = z.object({
	/** 
	 * Optional: Allows the user to change the default theme for the code blocks. 
	 * @example ['github-dark']
	 * 
	 * All available themes are listed in the [Shiki documentation](https://shiki.matsu.io/docs/themes).
	 */
	theme: z.custom<BundledShikiTheme>().optional(),
	/**
	 * Optional: Allows the user to enable verbose logging.
	 */
	verbose: z.boolean().optional(),
}).optional().default({});

export type astroGistsUserConfig = z.infer<typeof optionsSchema>