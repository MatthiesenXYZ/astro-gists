declare module "virtual:astro-gists/config" {
    const Config: import("./src/integration").UserConfig;
    export default Config;
}