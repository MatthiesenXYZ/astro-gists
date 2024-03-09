import { ExpressiveCodeTheme, loadShikiTheme, type BundledShikiTheme } from 'expressive-code'
import fs from 'node:fs'

function loadBundledThemeFromFile(theme: string) {
    return fs.readFileSync(new URL(`./themes/${theme}.jsonc`, import.meta.url), 'utf-8');
}

const houstonDark = loadBundledThemeFromFile('houston-dark');
const nightOwlLight = loadBundledThemeFromFile('night-owl-light');

export type BundledThemeName = 'astroGists-dark' | 'astroGists-light';

export type ShikiThemeOrBundledThemeName = BundledShikiTheme | BundledThemeName;

export async function loadTheme(
    themes: ShikiThemeOrBundledThemeName[] | undefined
    ): Promise<ExpressiveCodeTheme[]> {

        const shikiThemes = themes && !Array.isArray(themes) ? [themes] : themes

        const themesToLoad = (!shikiThemes || !shikiThemes.length) ? ['astroGists-dark', 'astroGists-light'] : shikiThemes;

        const loadedThemes = await Promise.all(
            themesToLoad.map(async (theme) => {
                if (theme === 'astroGists-dark' || theme === 'astroGists-light') {
                    const bundledTheme = theme === 'astroGists-dark' ? houstonDark : nightOwlLight;
                    return customizeBundledTheme(ExpressiveCodeTheme.fromJSONString(bundledTheme));
                }
                return await loadShikiTheme(theme as BundledShikiTheme);
            })
        );

        return loadedThemes;

}

function customizeBundledTheme(theme: ExpressiveCodeTheme) {
	return theme;
}