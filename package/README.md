# `Astro-Gists`

This is an [Astro integration](https://docs.astro.build/en/guides/integrations-guide/) that allows the user to import GitHub Gists by ID through an Astro Component and Octokit

## Usage

### Prerequisites

TODO:

### Installation

Install the integration **automatically** using the Astro CLI:

```bash
pnpm astro add @matthiesenxyz/astro-gists
```

```bash
npx astro add @matthiesenxyz/astro-gists
```

```bash
yarn astro add @matthiesenxyz/astro-gists
```

Or install it **manually**:

1. Install the required dependencies

```bash
pnpm add @matthiesenxyz/astro-gists
```

```bash
npm install @matthiesenxyz/astro-gists
```

```bash
yarn add @matthiesenxyz/astro-gists
```

2. Add the integration to your astro config

```diff
+import integration from "@matthiesenxyz/astro-gists";

export default defineConfig({
  integrations: [
+    integration(),
  ],
});
```

### Configuration

TODO:configuration

## Licensing

[MIT Licensed](./LICENSE). Made with ❤️ by [AdamMatthiesen](https://github.com/AdamMatthiesen) Under [MatthiesenXYZ](https://github.com/MatthiesenXYZ).

## Acknowledgements

TODO:
