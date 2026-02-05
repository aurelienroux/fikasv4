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

Use the `language` parameter in API options—**not** slug prefixing:

```vue
<script setup lang="ts">
const { locale } = useI18n()

// Pass undefined for French (default), locale string for others
const language = locale.value === "fr" ? undefined : locale.value

const { story } = await useAsyncStoryblok("home", {
  api: {
    version: "draft",
    language,  // Storyblok returns translated content
  },
  bridge: {},
});
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
```

For fetching multiple stories:

```ts
const storyblokApi = useStoryblokApi()
const response = await storyblokApi.get("cdn/stories", {
  version: "draft",
  language,
  starts_with: "evenements",
})
```

**Key points:**
- ✅ Use `language` parameter in API options
- ❌ Don't prefix slugs with `en/` (old approach)
- Pass `undefined` for French (default language)
- Same slug works for all locales

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

## Netlify Forms Integration

### The Problem

Netlify detects forms at **build time** by scanning static HTML. With SSR/SPA frameworks like Nuxt, forms are rendered dynamically via JavaScript, so Netlify can't detect them during the build process.

### The Solution: Static HTML Clones

Create a hidden static HTML file with form "blueprints" that Netlify can detect:

**File: `public/netlify-forms.html`**

```html
<!doctype html>
<html>
  <body>
    <!-- Hidden clone for contact form -->
    <form
      name="contact-form"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      hidden
    >
      <input type="hidden" name="form-name" value="contact-form" />
      <input type="hidden" name="bot-field" />
      <!-- All fields must match the Vue component -->
      <input type="text" name="firstname" />
      <input type="text" name="lastname" />
      <input type="email" name="email" />
      <select name="subject"></select>
      <textarea name="message"></textarea>
    </form>

    <!-- Hidden clone for newsletter form -->
    <form
      name="newsletter-form"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      hidden
    >
      <input type="hidden" name="form-name" value="newsletter-form" />
      <input type="hidden" name="bot-field" />
      <input type="text" name="firstname" />
      <input type="text" name="lastname" />
      <input type="email" name="email" />
    </form>
  </body>
</html>
```

**Key requirements:**
- `name` attribute must match between static clone and Vue component
- All field `name` attributes must be identical
- Include `data-netlify="true"` and honeypot field
- Use `hidden` attribute so they don't display

### Vue Form Component Pattern

```vue
<template>
  <form
    method="post"
    name="contact-form"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    @submit.prevent="handleSubmit"
  >
    <!-- Hidden fields required by Netlify -->
    <input type="hidden" name="form-name" value="contact-form" />
    <input type="hidden" name="bot-field" />

    <!-- Form fields... -->
    <input type="text" name="firstname" />
    <!-- ... -->
  </form>
</template>

<script setup lang="ts">
const handleSubmit = async (event: Event) => {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  try {
    // POST to the static HTML file, not the current page
    const response = await fetch('/netlify-forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
    })

    if (!response.ok) throw new Error('Submission failed')
    // Handle success...
  } catch {
    // Handle error...
  }
}
</script>
```

**Critical points:**
- ✅ Use `@submit.prevent` to prevent default browser submission
- ✅ POST to `/netlify-forms.html` (the static file), not the current page
- ✅ Use `application/x-www-form-urlencoded` content type (not `multipart/form-data`)
- ✅ Convert `FormData` to URL-encoded string with `URLSearchParams`
- ✅ Include `form-name` hidden field with the form's name value

### Common Mistakes to Avoid

| Mistake | Why it fails |
|---------|--------------|
| Missing static HTML clone | Netlify can't detect the form at build time |
| Field names don't match | Submissions won't have the expected fields |
| POST to current page | SSR routes may not handle form submission |
| Wrong Content-Type | Netlify expects URL-encoded data |
| Missing `form-name` field | Netlify won't know which form was submitted |

### Current Forms

| Form | Static Clone | Vue Component |
|------|--------------|---------------|
| Contact | `public/netlify-forms.html` | `app/components/contact/FormFields.vue` |
| Newsletter | `public/netlify-forms.html` | `app/components/globals/TheNewsletterForm.vue` |

## Netlify Deployment & Routing

### Why No SPA Fallback Redirect Is Needed

The legacy `netlify.toml` included a typical SPA fallback redirect:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Why SPAs need this pattern:**
- SPAs have a single `index.html` that bootstraps the JavaScript router
- Direct URL access (e.g., `/about`) would 404 without this redirect
- The redirect serves `index.html`, then Vue Router handles the path client-side

**Why Nuxt 4 doesn't need it:**

| Nuxt Behavior | Effect |
|---------------|--------|
| Pre-rendered routes | Each page gets its own HTML file (`/about/index.html`) |
| Nitro auto-generates `/200.html` | Fallback for dynamic routes not pre-rendered |
| Netlify auto-detects Nuxt | Configures build settings and routing automatically |

When you run `pnpm generate`, Nuxt creates static HTML for every pre-rendered route. Direct URL access works because the actual file exists—no redirect needed.

**When you would still need SPA fallback:**
- Pure SPA mode (`ssr: false` in `nuxt.config.ts`)
- No pre-rendering enabled
- All routing handled client-side only

### Current Configuration

The `app/netlify.toml` only contains form handling and header configuration—no routing redirects. Netlify handles Nuxt 4 routing automatically.

## Analytics (Facebook/Meta Pixel)

### Implementation

Uses `@nuxt/scripts` module with `useScriptMetaPixel` composable for GDPR-compliant tracking.

**Key files:**
- `app/composables/useAnalytics.ts` - Tracking composable
- `nuxt.config.ts` - Module registration + domain verification meta tag

### Configuration

```typescript
// nuxt.config.ts
modules: ['@nuxt/scripts'],
runtimeConfig: {
  public: {
    metapixelDefaultId: "", // Set via NUXT_PUBLIC_METAPIXEL_DEFAULT_ID
  },
},
app: {
  head: {
    meta: [
      { name: "facebook-domain-verification", content: "YOUR_VERIFICATION_CODE" },
    ],
  },
},
```

### useAnalytics Composable

```typescript
export const useAnalytics = () => {
  const config = useRuntimeConfig();
  const { hasCookieConsent } = useCookiesConsent();

  // Script loads only when hasCookieConsent becomes true (GDPR)
  const metaPixel = useScriptMetaPixel({
    id: config.public.metapixelDefaultId,
    scriptOptions: {
      trigger: hasCookieConsent,
    },
  });

  const track = (event: string) => {
    metaPixel.proxy.fbq('track', event);
  };

  return { track };
};
```

### Usage in Components

```typescript
const { track } = useAnalytics();

// On form submission
track('Contact');           // Contact form
track('CompleteRegistration'); // Newsletter signup
track('Donate');            // Donation
```

### Key Points

- **Consent-gated**: Script only loads after cookie consent via `trigger: hasCookieConsent`
- **Environment variable**: Pixel ID in `NUXT_PUBLIC_METAPIXEL_DEFAULT_ID` (not hardcoded)
- **Domain verification**: Meta tag in `app.head.meta` for Facebook Business verification
- **Proxy access**: Use `metaPixel.proxy.fbq()` not direct destructuring

### Why @nuxt/scripts over nuxt-meta-pixel?

| Feature | nuxt-meta-pixel | @nuxt/scripts |
|---------|-----------------|---------------|
| Maintenance | Third-party, outdated | Official Nuxt module |
| Consent handling | Manual | Built-in trigger system |
| TypeScript | Partial | Full support |
| Script optimization | Basic | Performance optimized |

## Assets

- Images: `legacy/assets/images/` → `app/assets/images/`
- SCSS: `legacy/assets/scss/` → `app/assets/scss/`
