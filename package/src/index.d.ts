import type { AstroIntegration } from "astro";
import type { astroGistsUserConfig} from "./schemas/UserConfigSchema";

export default function astroGists(options?: astroGistsUserConfig): AstroIntegration;