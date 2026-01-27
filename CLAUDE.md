# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Fikas** is a festival website being migrated from Nuxt 2 to Nuxt 4.

| Folder | Framework | Purpose |
|--------|-----------|---------|
| `legacy/` | Nuxt 2 + Vue 2 | Reference implementation (what to migrate) |
| `app/` | Nuxt 4 + Vue 3 | Migration target (where to build) |

The legacy folder contains the complete working application. Work happens in `app/` by progressively rebuilding features using modern Nuxt 4 patterns.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Run Nuxt 4 app (localhost:3000)
pnpm build            # Production build
pnpm generate         # Static site generation

# Reference the legacy app
cd legacy && pnpm dev # Run Nuxt 2 app for comparison
```

## Architecture

### Legacy Structure (Reference)

```
legacy/
├── components/          # ~55 Vue components, feature-organized
│   ├── UI/              # Buttons, icons, logos
│   ├── globals/         # Header, footer, navigation
│   ├── progEvents/      # Event programming
│   ├── team/            # Team members
│   └── ...              # Other feature domains
├── pages/               # File-based routing
├── store/               # Vuex (index, menu, cookiesConsent)
├── locales/             # FR/EN translations
├── assets/scss/         # Styles with responsive mixins
└── plugins/globalComponents.js  # Global component registration
```

### New App Structure (Current)

```
app/
├── app.vue              # Root: <NuxtLayout><NuxtPage /></NuxtLayout>
├── components/          # Migrated components (same organization)
│   ├── globals/         # TheHeader, TheHeaderMobile, TheFooter
│   ├── archives/        # Lightbox, ArchiveSelector, ArchiveYear
│   └── UI/              # Buttons, Icons, Logos
├── composables/         # State logic (replaces Vuex)
│   └── useCookiesConsent.ts
├── pages/               # Migrated pages
│   ├── index.vue        # Homepage
│   └── support/index.vue # Support/donations page
├── layouts/             # Page layouts
│   └── default.vue      # Main layout
├── storyblok/           # Storyblok-specific components
│   ├── Page.vue         # Dynamic component container
│   ├── Layout.vue       # Layout with decorations
│   ├── Hero.vue         # Hero image with title
│   ├── HeroVideo.vue    # Video hero section
│   ├── PageHeadline.vue # Section headlines with optional CTA
│   ├── Edition.vue      # Festival edition display
│   ├── Year.vue         # Year item for edition
│   ├── Paragraph.vue    # Rich text paragraphs
│   ├── Cookies.vue      # Cookie consent banner
│   ├── Donations.vue    # Donations container
│   └── Donation.vue     # Individual donation card
└── assets/
    ├── images/          # Copied from legacy
    └── scss/            # SCSS styles (copied from legacy)
        ├── index.scss   # Main entry point
        ├── _variables.scss
        ├── _mixins.scss
        └── _form.scss
```

Also at project root:
- `i18n/locales/` - FR/EN translation files
- `.env.example` - Environment variables template

## Key Migration Patterns

### Vue 2 → Vue 3 Component Syntax

```vue
<!-- Legacy (Options API) -->
<script>
export default {
  props: { blok: Object },
  data() { return { count: 0 } },
  computed: { doubled() { return this.count * 2 } },
  methods: { increment() { this.count++ } }
}
</script>

<!-- New (Composition API with script setup) -->
<script setup lang="ts">
defineProps<{ blok: object }>()
const count = ref(0)
const doubled = computed(() => count.value * 2)
const increment = () => count.value++
</script>
```

### Vuex → Composables

```typescript
// Legacy: legacy/store/menu.js (Vuex)
export const state = () => ({ isOpen: false })
export const mutations = { toggle(state) { state.isOpen = !state.isOpen } }

// New: app/composables/useMenu.ts
export const useMenu = () => {
  const isOpen = useState('menu-open', () => false)
  const toggle = () => { isOpen.value = !isOpen.value }
  return { isOpen, toggle }
}
```

### Data Fetching

```typescript
// Legacy: this.$storyapi.get() with asyncData
// New: useFetch or useAsyncData
const { data } = await useFetch('/api/story')
```

### i18n

```typescript
// Legacy: this.$t('key')
// New:
const { t } = useI18n()
t('key')
```

In templates, use the composable:
```vue
<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <span>{{ t('some.translation.key') }}</span>
</template>
```

## Storyblok CMS

The site is content-driven via Storyblok.

### Legacy patterns (for reference):
1. Components receive CMS data via `blok` prop
2. Dynamic rendering: `<component :is="blok.component" :blok="blok" />`
3. Rich text: `$storyapi.richTextResolver.render(blok.content)`

### Nuxt 4 patterns (current):
1. Use `@storyblok/nuxt` module
2. Storyblok components go in `app/storyblok/` folder
3. Fetch with `useAsyncStoryblok()`:
   ```typescript
   const { story } = await useAsyncStoryblok("slug", {
     api: { version: "draft" },
     bridge: {},
   });
   ```
4. Render with `<StoryblokComponent :blok="story.content" />`
5. Add `v-editable="blok"` directive to component root for visual editor

## Styling

**Using SCSS** (same as legacy). Styles copied from `legacy/assets/scss/` to `app/assets/scss/`.

### SCSS Configuration in nuxt.config.ts

```typescript
css: ["~/assets/scss/index.scss"],
vite: {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "~/assets/scss/_variables.scss" as *;
          @use "~/assets/scss/_mixins.scss" as *;
        `,
      },
    },
  },
},
```

### Important: Use @use, not @import

Sass `@import` is deprecated. Always use `@use` with `as *` for global access:

```scss
// In index.scss
@use '~/assets/scss/_variables.scss' as *;
@use '~/assets/scss/_mixins.scss' as *;
@use '~/assets/scss/_form.scss';

// In component files or other SCSS files that need variables
@use '~/assets/scss/_variables.scss' as *;
```

### Key Variables (from _variables.scss)

```scss
$aqua-blue: #06c9e0;
$charcoal-grey: #303442;
$light-teal: #bdede3;
$perrywinkle: #877cee;
$topaz: #1abfd3;
$very-light-purple: #f1b1f9;
$white: #fff;
$black: #000;
```

### Responsive Mixins (from _mixins.scss)

```scss
@include for-tablet-portrait-up { }   // >= 600px
@include for-tablet-landscape-up { }  // >= 900px
@include for-desktop-up { }           // >= 1200px
@include for-big-desktop-up { }       // >= 1800px
```

Google Fonts loaded via `@nuxtjs/google-fonts` module.

## i18n Configuration

- Default: French (fr) - no URL prefix
- Secondary: English (en) - `/en` prefix
- Strategy: `prefix_except_default`
- Files: `legacy/locales/fr.json`, `legacy/locales/en.json`

Use `@nuxtjs/i18n` v9+ for Nuxt 4.

## State Modules to Migrate

| Legacy Vuex Module | Purpose | New Composable | Status |
|--------------------|---------|----------------|--------|
| `store/index.js` | Navigation data (FR/EN) | `useNavigation()` | TODO |
| `store/menu.js` | Menu state, newsletter toggle | `useMenu()` | TODO |
| `store/cookiesConsent.js` | Cookie preferences | `useCookiesConsent()` | ✅ Done |

## Dependencies Migration

| Feature | Legacy | Nuxt 4 Equivalent | Status |
|---------|--------|-------------------|--------|
| HTTP | Axios | `$fetch` (built-in) | Ready |
| State | Vuex | `useState` composables | In Progress |
| CMS | @nuxtjs/storyblok | @storyblok/nuxt | ✅ Installed |
| i18n | nuxt-i18n | @nuxtjs/i18n v9+ | ✅ Installed |
| CSS | SCSS | SCSS (sass package) | ✅ Installed |
| Fonts | - | @nuxtjs/google-fonts | ✅ Installed |
| FB Pixel | nuxt-facebook-pixel-module | nuxt-meta-pixel | ✅ Installed |
| Icons | FontAwesome | @fortawesome/vue-fontawesome | TODO |
| Tests | Jest | Vitest (recommended) | TODO |

### Facebook Pixel (nuxt-meta-pixel)

Configuration in `nuxt.config.ts`:
```typescript
modules: ["nuxt-meta-pixel"],
runtimeConfig: {
  public: {
    metapixel: {
      default: { id: "" },  // Set via NUXT_PUBLIC_METAPIXEL_DEFAULT_ID env var
    },
  },
},
```

Usage in components:
```typescript
const { $fbq } = useNuxtApp()
$fbq('track', 'Donate')  // or any FB event
```

## Migration Workflow

1. **Pick a feature** from legacy (component, page, or system)
2. **Read the legacy code** to understand functionality
3. **Create in app/** using Nuxt 4 patterns (TypeScript, Composition API)
4. **Test** with `pnpm dev`
5. **Repeat** for next feature

Maintain the same folder organization from legacy. Adapt code to Vue 3/Nuxt 4 idioms rather than direct copy-paste.

## Key Reference Files

| What | Where |
|------|-------|
| Nuxt 2 config | `legacy/nuxt.config.js` |
| Global components list | `legacy/plugins/globalComponents.js` |
| All pages | `legacy/pages/` |
| Vuex stores | `legacy/store/` |
| Translations | `legacy/locales/` |
| SCSS system | `legacy/assets/scss/` |
| Storyblok patterns | `legacy/README.md` |

## Current Migration Progress

### Completed Setup

1. **Deployment**: Connected to Netlify
2. **SCSS**: Copied from legacy with modern `@use` syntax
3. **Google Fonts**: Karla, Rubik, Covered By Your Grace
4. **Storyblok**: Configured with `@storyblok/nuxt` (token in `.env`)
5. **i18n**: Configured with `@nuxtjs/i18n` (FR default, EN secondary)

### Migrated Components

```
app/
├── app.vue                          # Root: <NuxtLayout><NuxtPage /></NuxtLayout>
├── pages/
│   ├── index.vue                    # Homepage with Storyblok fetch
│   └── support/index.vue            # Support/donations page
├── layouts/
│   └── default.vue                  # Main layout with header/footer
├── composables/
│   └── useCookiesConsent.ts         # Cookie consent state management
├── storyblok/
│   ├── Page.vue                     # Container for dynamic components
│   ├── Layout.vue                   # Layout with decorative elements
│   ├── Hero.vue                     # Hero image with title overlay
│   ├── HeroVideo.vue                # Video hero with YouTube embed
│   ├── PageHeadline.vue             # Section headlines with optional CTA button
│   ├── Edition.vue                  # Festival edition with year list
│   ├── Year.vue                     # Individual year item
│   ├── Paragraph.vue                # Rich text content
│   ├── Cookies.vue                  # Cookie consent banner
│   ├── Donations.vue                # Donations grid container
│   └── Donation.vue                 # Individual donation card with FB tracking
└── components/
    ├── globals/
    │   ├── TheHeader.vue            # Desktop header (tablet-landscape+)
    │   ├── TheHeaderMobile.vue      # Mobile header (< tablet-landscape)
    │   └── TheFooter.vue            # Footer
    ├── archives/
    │   ├── Lightbox.vue             # Image lightbox modal
    │   ├── ArchiveSelector.vue      # Year selector for archives
    │   └── ArchiveYear.vue          # Archive content (photos/videos/prog)
    └── UI/
        ├── Buttons/
        │   └── Btn.vue              # General purpose button/link
        ├── Logos/
        │   ├── Logo.vue             # Main SVG logo
        │   └── LogoFooter.vue       # Footer SVG logo
        └── Icons/
            ├── IconVideoScroll.vue  # Scroll down arrow
            ├── IconMore.vue         # "More" arrow icon
            ├── IconClose.vue        # X close button
            ├── IconMenu.vue         # Hamburger menu (animates to X)
            ├── IconDrawer.vue       # +/- toggle (small, purple)
            └── IconDrawerMap.vue    # +/- toggle (large, white)
```

### Key Configuration Files

- `nuxt.config.ts` - Main config with all modules, SCSS, and Facebook Pixel setup
- `.env` - Contains secrets (not committed):
  - `STORYBLOK_DELIVERY_API_TOKEN`
  - `NUXT_PUBLIC_METAPIXEL_DEFAULT_ID`
- `.env.example` - Template for required environment variables
- `i18n/locales/fr.json` and `en.json` - Translations

### Known Issues / Notes

1. **Component auto-import naming**: Nuxt uses path-based naming. Always use full path:
   - `components/globals/TheHeader.vue` → `<GlobalsTheHeader />`
   - `components/UI/Logos/Logo.vue` → `<UILogosLogo />`
   - `components/UI/Buttons/Btn.vue` → `<UIButtonsBtn />`
   - `components/UI/Icons/IconMore.vue` → `<UIIconsIconMore />`

2. **TypeScript with Storyblok**: Using `// @ts-ignore` for `SbBlokData` type issues

3. **i18n locale path**: Files must be in `i18n/locales/` (Nuxt i18n adds `i18n/` prefix to `langDir`)

4. **Navigation links**: Currently hardcoded placeholders in headers - need to connect to Storyblok data

5. **Hydration issues**: Ensure computed properties return consistent values (e.g., URLs should always start with `/`)

### Next Steps to Continue Migration

1. **More UI components**: Migrate remaining buttons (BtnFacebook, BtnInsta, BtnYoutube, BtnScrollTop)
2. **Navigation data**: Connect headers to Storyblok navigation (see `legacy/store/index.js`)
3. **Composables**: Create `useMenu()`, `useNavigation()`
4. **Additional pages**: `/programmation`, `/festival`, `/archives`, `/contact`, etc.
5. **More Storyblok components**: As needed for each page

### Migrated Pages

| Page | Legacy Path | New Path | Status |
|------|-------------|----------|--------|
| Homepage | `legacy/pages/index.vue` | `app/pages/index.vue` | ✅ Done |
| Support | `legacy/pages/support/index.vue` | `app/pages/support/index.vue` | ✅ Done |
| Archives | `legacy/pages/archives/index.vue` | - | TODO |
| Festival | `legacy/pages/festival/index.vue` | - | TODO |
| Contact | `legacy/pages/contact/index.vue` | - | TODO |
| Programmation | `legacy/pages/programmation/index.vue` | - | TODO |

### Storyblok Data Fetching Pattern (with i18n)

```vue
<script setup lang="ts">
const { locale } = useI18n()

// French (default): "home" | English: "en/home"
const slug = locale.value === 'en' ? 'en/home' : 'home'

const { story } = await useAsyncStoryblok(slug, {
  api: {
    version: "draft",
  },
  bridge: {
    // Enables live preview in Storyblok Visual Editor
    // Replaces legacy mounted() $storybridge.on() code
  },
});
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
```

**Important**: `useAsyncStoryblok` returns `{ story }` - must destructure it.

### Rich Text Rendering

```typescript
import { renderRichText } from '@storyblok/vue'

const renderedContent = computed(() => renderRichText(props.blok.content))
```

```vue
<template>
  <div v-html="renderedContent"></div>
</template>
```

### Assets

- Images: `legacy/assets/images/` → `app/assets/images/`
- SCSS: `legacy/assets/scss/` → `app/assets/scss/`

## Working Style

- Show proposed changes before executing
- Wait for explicit approval before creating/modifying files
- Work step-by-step with validation at each stage
- No batch operations without review
