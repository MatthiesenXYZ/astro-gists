// Export Integration
import astroGist from "./integration";
export default astroGist;

// Export the user config schema
import { z } from "astro/zod";
import type { ShikiThemeOrBundledThemeName } from "./ExpressiveCode/theming"

export const optionsSchema = z.object({
	/** 
	 * Optional: Allows the user to change the default theme for the code blocks. 
	 * @default ['astroGist-dark','astroGist-light']
	 * 
	 * All available themes are listed in the [Shiki documentation](https://shiki.matsu.io/docs/themes).
	 */
	theme: z.custom<ShikiThemeOrBundledThemeName[]>().optional(),
});

export type astroGistsUserConfig = z.infer<typeof optionsSchema>