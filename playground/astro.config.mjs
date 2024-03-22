import { defineConfig } from "astro/config";
import astroGists from "@matthiesenxyz/astro-gists";
import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
  integrations: [astroGists(), mdx()]
});

