// Export the user config schema
import { z } from "astro/zod";
import type { BundledShikiTheme } from "./ExpressiveCode/engine";

export const optionsSchema = z.object({
	/** 
	 * Optional: Allows the user to change the default theme for the code blocks. 
	 * @example ['github-light','github-dark']
	 * @example 'github-light'
	 * 
	 * @see All available themes are listed in the [Shiki documentation](https://shiki.matsu.io/docs/themes)
	 * 
	 */
	themes: z.custom<BundledShikiTheme[]|BundledShikiTheme>().optional(),
	/**
	 * Optional: Allows the user to enable verbose logging.
	 */
	verbose: z.boolean().optional().default(false),
  }).optional().default({ verbose: false });

export type astroGistsUserConfig = z.infer<typeof optionsSchema>