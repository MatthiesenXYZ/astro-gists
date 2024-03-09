declare module "virtual:astro-gists/config" {
    const Config: import("./src/index").astroGistsUserConfig;
    export default Config;
}