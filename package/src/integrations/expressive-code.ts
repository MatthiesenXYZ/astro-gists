import {
	astroExpressiveCode,
	type AstroExpressiveCodeOptions,
	type CustomConfigPreprocessors
} from 'astro-expressive-code';
import type { AstroIntegration } from 'astro';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

/**
 * Create an Expressive Code configuration preprocessor based on Starlight config.
 * Used internally to set up Expressive Code and by the `<Code>` component.
 */
export function getGistsEcConfigPreprocessor(): CustomConfigPreprocessors['preprocessAstroIntegrationConfig'] {
	return (input): AstroExpressiveCodeOptions => {

	const ecConfig = input.ecConfig as AstroExpressiveCodeOptions; // Replace {} with the appropriate value for ecConfig
	const {
		themes = ["github-dark", "github-light"] as const,
		plugins = [pluginLineNumbers()],
		...rest
	} = ecConfig;

		return {
			themes,
			plugins,
			...rest,
		};
	};
}

export function astroGistsExpressiveCode(): AstroIntegration[] {
	return [
		astroExpressiveCode({
			customConfigPreprocessors: {
				preprocessAstroIntegrationConfig: getGistsEcConfigPreprocessor(),
				preprocessComponentConfig: `
					import { getGistsEcConfigPreprocessor } from '@matthiesenxyz/astro-gists/internal'

					export default getGistsEcConfigPreprocessor()
				`,
			},
		}),
	];
};