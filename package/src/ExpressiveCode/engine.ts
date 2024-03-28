import { ExpressiveCodeEngine, type ExpressiveCodeTheme, type ExpressiveCodeEngineConfig, type ExpressiveCodePlugin } from '@expressive-code/core'
import { type PluginFramesOptions, pluginFrames } from '@expressive-code/plugin-frames'
import type { PluginShikiOptions } from '@expressive-code/plugin-shiki'
import { loadShikiTheme, pluginShiki, type BundledShikiTheme } from '@expressive-code/plugin-shiki'
import { pluginTextMarkers } from '@expressive-code/plugin-text-markers'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

export * from '@expressive-code/core'
export * from '@expressive-code/plugin-frames'
export * from '@expressive-code/plugin-shiki'
export * from '@expressive-code/plugin-text-markers'

export interface ExpressiveCodeConfig extends ExpressiveCodeEngineConfig {
	/**
	 * The Shiki plugin adds syntax highlighting to code blocks.
	 *
	 * This plugin is enabled by default. Set this to `false` to disable it.
	 * You can also configure the plugin by setting this to an options object.
	 */
	shiki?: PluginShikiOptions | boolean | undefined
	/**
	 * The Text Markers plugin allows to highlight lines and inline ranges
	 * in code blocks in various styles (e.g. marked, inserted, deleted).
	 *
	 * This plugin is enabled by default. Set this to `false` to disable it.
	 */
	textMarkers?: boolean | undefined
	/**
	 * The Frames plugin adds an editor or terminal frame around code blocks,
	 * including an optional title displayed as a tab or window caption.
	 *
	 * This plugin is enabled by default. Set this to `false` to disable it.
	 * You can also configure the plugin by setting this to an options object.
	 */
	frames?: PluginFramesOptions | boolean | undefined
    themes?: ExpressiveCodeTheme[] | undefined;
}


export async function getTheme(themeName: BundledShikiTheme): Promise<ExpressiveCodeTheme> {
    return await loadShikiTheme(themeName)
}

const darkTheme = await getTheme('catppuccin-macchiato')
const lightTheme = await getTheme('catppuccin-latte')

export class ExpressiveCode extends ExpressiveCodeEngine {
	constructor({ shiki, textMarkers, frames, themes, ...baseConfig }: ExpressiveCodeConfig = {}) {
		// Collect all default plugins with their configuration,
		// but skip those that were disabled or already added to plugins
		const pluginsToPrepend: ExpressiveCodePlugin[] = []
		const baseConfigPlugins = baseConfig.plugins?.flat() || []
		const notPresentInPlugins = (name: string) => baseConfigPlugins.every((plugin) => plugin.name !== name)
		if (shiki !== false && notPresentInPlugins('Shiki')) {
			pluginsToPrepend.push(pluginShiki(shiki !== true ? shiki : undefined))
		}
		if (textMarkers !== false && notPresentInPlugins('TextMarkers')) {
			if (typeof textMarkers === 'object' && (textMarkers as { styleOverrides: unknown }).styleOverrides) {
				throw new Error(
					`The Expressive Code config option "textMarkers" can no longer be an object,
					but only undefined or a boolean. Please move any style settings into the
					top-level "styleOverrides" object below the new "textMarkers" key.`.replace(/\s+/g, ' ')
				)
			}
			pluginsToPrepend.push(pluginTextMarkers())
		}
		if (frames !== false && notPresentInPlugins('Frames')) {
			if (typeof frames === 'object' && (frames as { styleOverrides: unknown }).styleOverrides) {
				throw new Error(
					`The config option "frames" no longer has its own "styleOverrides" object.
					Please move any style settings into the top-level "styleOverrides" object
					below the new "frames" key.`.replace(/\s+/g, ' ')
				)
			}
			pluginsToPrepend.push(pluginFrames(frames !== true ? frames : undefined))
		}

        pluginsToPrepend.push(pluginLineNumbers())

		// Create a new plugins array with the default plugins prepended
		const pluginsWithDefaults = [...pluginsToPrepend, ...(baseConfig.plugins || [])]

        if (!themes) {
            themes = [darkTheme, lightTheme]
        }

		// Call the base constructor with the new plugins array
		super({ ...baseConfig, themes, plugins: pluginsWithDefaults })
	}
}