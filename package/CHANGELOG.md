# @matthiesenxyz/astro-gists

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
