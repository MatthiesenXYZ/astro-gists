# @matthiesenxyz/astro-gists

## 0.2.13

### Patch Changes

- 746fe4a: improve internal functions and error handling

## 0.2.12

### Patch Changes

- 53ce8a0: [internal] update AIK to latest version

## 0.2.11

### Patch Changes

- 39f03af: Bump dependencies:

  - @expressive-code/plugin-line-numbers from to
  - astro-integration-kit from to
  - expressive-code from to
  - astro from to

## 0.2.10

### Patch Changes

- bcc60cb: [Internal] Fix Logger and response types

## 0.2.9

### Patch Changes

- bf9ae61: adds better logging and a new Error handling system, Only user facing change is a verbose switch in config options

## 0.2.8

### Patch Changes

- aa7d061: NEW: we now have a virtual import available to use instead! to use this new import simply do `import { GetGist, GetGistGroup } from "astro-gists:components"` and you'll be good to go at the first boot of your dev server!

## 0.2.7

### Patch Changes

- 4ce42d9: Bump dependencies:

  - vite from to
  - astro from to

## 0.2.6

### Patch Changes

- 18e132f: patch for css

## 0.2.5

### Patch Changes

- e500aeb: fix CSS issue with View Raw Button

## 0.2.4

### Patch Changes

- a6696ed: Readds a basic version of the theme system for now

## 0.2.3

### Patch Changes

- fc5ea6d: bug fix, disable theme system for the moment

## 0.2.2

### Patch Changes

- 1370875: Changes:

  - Internal refactor that will provide better future-proofing, this change also allowed the addition of EC's built in light/dark mode automations! Code Blocks will now be able to show both dark/light mode depending on the user's system preferences.

  # NEW:

  - adds light/darkmode support
  - Themes can be defined by either single theme or an array (`['astroGists-dark','astroGists-light']`)

## 0.2.1

### Patch Changes

- 1bb091e: Update README.md

## 0.2.0

### Minor Changes

- a27b127: BREAKING:

  - `@astrojs/mdx` has been removed from the internal integration, please add this back on your own if you need it.

  NEW:

  - Custom Expressive-Code Implimentation that can run along-side existing installs! Making this package super flexable now!
  - You can now customize the code blocks theme by settings the `theme` option in your `astro.config.mjs`, Available options are listed [here](https://shiki.matsu.io/docs/themes)

## 0.1.2

### Patch Changes

- fae83c2: Update:

  - Update Readme to reflect potential Octokit issues in SSR as per [Issue #15](https://github.com/MatthiesenXYZ/astro-gists/issues/15)

  Bump dependencies:

  - astro-integration-kit from to
  - vite from to
  - astro from to

## 0.1.1

### Patch Changes

- a27111a: update mdx integration config, as well as impliment ratelimit checks on Octokit with logs!

## 0.1.0

### Minor Changes

- 8a99f5a: NEW:

  - Added `@astrojs/mdx` to built in options as the MDX integration has specicial placement requirements. (This was the easy option)
    - Enabled by Default
    - Can be disabled by passing `MDXIntegration: false` within the main `astroGist()` object in astro.config.mjs

  Update:

  - new version of `astro-integration-kit` allowing some much needed code cleanup
  - Better logs!

### Patch Changes

- 531d704: Update main package.json to fix some Dependencies that were not properly marked

## 0.0.3

### Patch Changes

- f5d2f29: Added new <GetGistGroup> Component to get entire collections of gists (See Readme for more info)

## 0.0.2

### Patch Changes

- cf9311b: Update README and add example image

## 0.0.1

### Patch Changes

- fbf4a7a: Initial release
