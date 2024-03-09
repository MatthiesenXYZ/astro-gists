import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import { ExpressiveCode } from 'expressive-code'
// import config from "virtual:astro-gists/config";
// import { loadTheme } from "./theming";

export { default as Code } from './components/Code.astro'

export const engine = new ExpressiveCode({
	//themes: await loadTheme(config.theme),
	plugins: [pluginLineNumbers()],
})