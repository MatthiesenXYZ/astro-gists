declare module "virtual:astro-gists/config" {
    const Config: import("./src/schemas/UserConfigSchema").astroGistsUserConfig;
    export default Config;
}