
import { ExpressiveCode, type BundledShikiTheme, type ExpressiveCodeTheme, loadShikiTheme } from './engine'
import Config from 'virtual:astro-gists/config'

// Export defined components
export { default as Code } from './components/Code.astro'


export async function getTheme(themeName: BundledShikiTheme): Promise<ExpressiveCodeTheme> {
    return await loadShikiTheme(themeName)
}

// Get the themes from the configuration
const { themes: userThemes } = Config

const themes: ExpressiveCodeTheme[] = []

// Load the themes from the configuration
if (userThemes) {
	if (Array.isArray(userThemes)) {
		for (const themeName of userThemes) {
			themes.push(await getTheme(themeName))
		}
	} else {
		themes.push(await getTheme(userThemes))
	}
}

// Create a custom instance of ExpressiveCode
export const engine = new ExpressiveCode({ themes: userThemes?.length ? themes : undefined })

