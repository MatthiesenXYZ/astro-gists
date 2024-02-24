import { defineConfig } from "astro/config";
import astroGist from "@matthiesenxyz/astro-gists";

// https://astro.build/config
export default defineConfig({
  integrations: [astroGist()]
});