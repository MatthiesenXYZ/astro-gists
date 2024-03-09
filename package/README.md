# `Astro-Gists`

This is an [Astro integration](https://docs.astro.build/en/guides/integrations-guide/) that allows the user to import GitHub Gists by ID through an Astro Component and Octokit

## Example

![Example of AstroGists in use](./src/assets/example.png)

## Usage

### Prerequisites

The Only Requirement to install this package is a **Github account with a Verified Email** to be able to create a Personal Access Token.

This Integration uses [`Octokit`](http://octokit.github.io/) by `GitHub` to Generate custom gists using [`ExpressiveCode`](https://expressive-code.com/) within your Astro project!

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
import { defineConfig } from "astro/config";
+import astroGist from "@matthiesenxyz/astro-gists";

// https://astro.build/config
export default defineConfig({
+  integrations: [astroGist({
	// This is the default options shown... dark is Astro's Houston-dark, and light is currently nightowl-light until a Houston-light is released.
	theme: ['astroGists-dark', 'astroGists-light']
+  })]
});
```

### Configuration

Setup your `.env` file with the following secret from github:

Github Personal Access Token (Classic) 
 - No Special Permissions required 
 - Octokit recommends creating an empty token for this!

```dotenv
GITHUB_PERSONAL_TOKEN=ghp_YOURPERSONALTOKENHERE
```

*Note: Without this token, you will be HEAVILY limited by quantity of requests made with Octokit. (Unauthorized Octokit Instances are limited to 60 requests per hour)*

*Note: It is recommended to use this Integration in SSG(Static Site) mode only(or enable prerendering for pages with Gists), as in SSR(Server Rendered) mode that could overload your Octokit request limit quite fast.  Keep in mind for each Gist/Gists request made that counts twords your global limit.(60 requests per hour for unauthorized Octokit, 5,000 requests per hour for personal access tokens, and if using a GitHub App by Under GitHub Enterprise Cloud is 15,000+) see [GitHub Docs](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28#primary-rate-limit-for-authenticated-users)*

### Usage

#### `<GetGist>` Shows a SINGLE gist from a GistCollection

This Utility is meant to display a single Gist as Codeblocks using ExpressiveCode for Astro instead of Scripted Elements using the default Gist method by calling the ID and Filename

```astro
---
import { GetGist } from "@matthiesenxyz/astro-gists/components"
// OR
import GetGist from "@matthiesenxyz/astro-gists/GetGist"
---
<GetGist 
	gistId="your-gist-id-here"
	filename="name-of-desired-file-to-be-displayed.md" 
/>
```

#### `<GetGistGroup>` Shows all of the Gists from a GistCollection

This Utility is meant to display an entire collection of Gists by ID

```astro
---
import { GetGistGroup } from "@matthiesenxyz/astro-gists/components"
// OR
import GetGistGroup from "@matthiesenxyz/astro-gists/GetGistGroup"
---
<GetGistGroup 
	gistId="your-gist-id-here"
/>
```

## Contributing

This package is structured as a monorepo:

- `playground` contains code for testing the package
- `package` contains the actual package

Install dependencies using pnpm: 

```bash
pnpm i --frozen-lockfile
```

Start the playground:

```bash
pnpm playground:dev
```

You can now edit files in `package`. Please note that making changes to those files may require restarting the playground dev server.

## Licensing

[MIT Licensed](./LICENSE). Made with ❤️ by [AdamMatthiesen](https://github.com/AdamMatthiesen) Under [MatthiesenXYZ](https://github.com/MatthiesenXYZ).

## Acknowledgements

- [`Octokit`](http://octokit.github.io) by GitHub
- [`Expressive-Code`](https://expressive-code.com/) By Hippotasic
- [`@astrojs/mdx`](https://docs.astro.build/en/guides/integrations-guide/mdx/) by withAstro
- [`astro-integration-kit`](https://github.com/florian-lefebvre/astro-integration-kit) by Florian
