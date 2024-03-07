# @matthiesenxyz/astro-gists

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
