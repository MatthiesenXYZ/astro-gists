import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import { ExpressiveCode, loadShikiTheme, type BundledShikiTheme } from 'expressive-code'
import config from "virtual:astro-gists/config";

export { default as Code } from './components/Code.astro'

export const engine = new ExpressiveCode({
	themes: [
		config.theme ? 
		await loadShikiTheme(config.theme as BundledShikiTheme) :
		await loadShikiTheme('catppuccin-macchiato'), await loadShikiTheme('catppuccin-latte')
	],
	plugins: [pluginLineNumbers()],
})

