declare module "virtual:astro-gists/config" {
    const Config: import("./src/UserConfigSchema").astroGistsUserConfig;
    export default Config;
}