/**
 * @file This file provides the types for Astro-Gists's `@matthiesenxyz/astro-gists/expressive-code` export.
 */

export * from 'astro-expressive-code';

import type { AstroGistsExpressiveCodeOptions } from './src/integrations/expressive-code';

export type { AstroGistsExpressiveCodeOptions };

/**
 * A utility function that helps you define an Expressive Code configuration object. It is meant
 * to be used inside the optional config file `ec.config.mjs` located in the root directory
 * of your Starlight project, and its return value to be exported as the default export.
 *
 * Expressive Code will automatically detect this file and use the exported configuration object
 * to override its own default settings.
 *
 * Using this function is recommended, but not required. It just passes through the given object,
 * but it also provides type information for your editor's auto-completion and type checking.
 *
 * @example
 * ```js
 * // ec.config.mjs
 * import { defineEcConfig } from '@matthiesenxyz/astro-gists/expressive-code'
 *
 * export default defineEcConfig({
 *   themes: ['github-dark', 'github-light'],
 *   styleOverrides: {
 *     borderRadius: '0.5rem',
 *   },
 * })
 * ```
 */
export function defineEcConfig(
	config: AstroGistsExpressiveCodeOptions
): AstroGistsExpressiveCodeOptions;