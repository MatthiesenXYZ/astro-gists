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
    styleOverrides: { ...otherStyleOverrides } = {},
    plugins = [pluginLineNumbers()],
    ...rest
} = ecConfig;

		return {
			themes,
			styleOverrides: {
				borderRadius: '0px',
				borderWidth: '1px',
				codePaddingBlock: '0.75rem',
				codePaddingInline: '1rem',
				codeFontFamily: 'var(--__sl-font-mono)',
				codeFontSize: 'var(--sl-text-code)',
				codeLineHeight: 'var(--sl-line-height)',
				uiFontFamily: 'var(--__sl-font)',
				textMarkers: {
					lineDiffIndicatorMarginLeft: '0.25rem',
					defaultChroma: '45',
					backgroundOpacity: '60%',
				},
				...otherStyleOverrides,
			},
			plugins,
			...rest,
		};
	};
}

export const astroGistsExpressiveCode = (): AstroIntegration[] => {
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