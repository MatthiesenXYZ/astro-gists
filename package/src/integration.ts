import type { AstroIntegration } from "astro";

export const integration = (): AstroIntegration => {
	return {
		name: "@matthiesenxyz/astro-gists",
		hooks: {},
	};
};
