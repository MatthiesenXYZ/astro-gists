---
"@matthiesenxyz/astro-gists": minor
---

NEW: 

- Added `@astrojs/mdx` to built in options as the MDX integration has specicial placement requirements. (This was the easy option)
  - Enabled by Default
  - Can be disabled by passing `MDXIntegration: false` within the main `astroGist()` object in astro.config.mjs

Update:

- new version of `astro-integration-kit` allowing some much needed code cleanup
- Better logs!
