import { defineConfig } from "astro/config";
import astroGist from "@matthiesenxyz/astro-gists";
import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
  integrations: [astroGist(), mdx()]
});

