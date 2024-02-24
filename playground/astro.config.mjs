import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import integration from "@matthiesenxyz/astro-gists";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), integration()],
});
