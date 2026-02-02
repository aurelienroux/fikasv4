# Technical Specification

Architecture, patterns, and coding conventions for the Fikas migration.

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
├── layouts/             # Page layouts
│   └── default.vue      # Main layout
├── storyblok/           # Storyblok-specific components
└── assets/
    ├── images/          # Copied from legacy
    └── scss/            # SCSS styles (copied from legacy)
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

**Use `<StoryblokRichText>` component** (preferred over `renderRichText()`):

```vue
<template>
  <StoryblokRichText v-if="blok.text" :doc="blok.text" />
</template>
```

#### Why StoryblokRichText vs renderRichText?

| Feature | `renderRichText()` | `StoryblokRichText` |
|---------|-------------------|---------------------|
| Output | HTML string | Vue component |
| Rendering | Requires `v-html` | Direct component |
| Custom components | Needs runtime workarounds | Native `resolvers` prop |
| Security | XSS risk with `v-html` | Vue-safe rendering |

**Avoid** the legacy `renderRichText()` approach:
```typescript
// ❌ Legacy - requires v-html, XSS risk, not Vue-native
import { renderRichText } from '@storyblok/vue'
const content = computed(() => renderRichText(props.blok.content))
// <div v-html="content"></div>
```

**Use** `StoryblokRichText` for all rich text fields - it's the modern, Vue-native approach that doesn't require `v-html` and supports custom resolvers.

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
- Files: `i18n/locales/fr.json`, `i18n/locales/en.json`

Use `@nuxtjs/i18n` v9+ for Nuxt 4.

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

## Component Auto-Import Naming

Nuxt uses path-based naming. Always use full path:
- `components/globals/TheHeader.vue` → `<GlobalsTheHeader />`
- `components/UI/Logos/Logo.vue` → `<UILogosLogo />`
- `components/UI/Buttons/Btn.vue` → `<UIButtonsBtn />`
- `components/UI/Icons/IconMore.vue` → `<UIIconsIconMore />`

## Known Technical Issues

1. **TypeScript with Storyblok**: Using `// @ts-ignore` for `SbBlokData` type issues

2. **i18n locale path**: Files must be in `i18n/locales/` (Nuxt i18n adds `i18n/` prefix to `langDir`)

3. **Navigation links**: Currently hardcoded placeholders in headers - need to connect to Storyblok data

4. **Hydration issues**: Ensure computed properties return consistent values (e.g., URLs should always start with `/`)

## Assets

- Images: `legacy/assets/images/` → `app/assets/images/`
- SCSS: `legacy/assets/scss/` → `app/assets/scss/`
