# Migration Progress

Tracking what's done and what's left to migrate.

## State Modules to Migrate

| Legacy Vuex Module | Purpose | New Composable | Status |
|--------------------|---------|----------------|--------|
| `store/index.js` | Navigation data (FR/EN) | `useNavigation()` | ✅ Done |
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
| FB Pixel | nuxt-facebook-pixel-module | nuxt-meta-pixel | ⚠️ Needs fix |
| Icons | FontAwesome | @fortawesome/vue-fontawesome | TODO |
| Tests | Jest | Vitest (recommended) | TODO |

## Completed Setup

1. **Deployment**: Connected to Netlify
2. **SCSS**: Copied from legacy with modern `@use` syntax
3. **Google Fonts**: Karla, Rubik, Covered By Your Grace
4. **Storyblok**: Configured with `@storyblok/nuxt` (token in `.env`)
5. **i18n**: Configured with `@nuxtjs/i18n` (FR default, EN secondary)

## Key Configuration Files

- `nuxt.config.ts` - Main config with all modules, SCSS setup
- `.env` - Contains secrets (not committed):
  - `STORYBLOK_DELIVERY_API_TOKEN`
  - `NUXT_PUBLIC_METAPIXEL_DEFAULT_ID`
- `.env.example` - Template for required environment variables
- `i18n/locales/fr.json` and `en.json` - Translations

## Migrated Components

```
app/
├── app.vue                          # Root: <NuxtLayout><NuxtPage /></NuxtLayout>
├── pages/
│   ├── index.vue                    # Homepage
│   ├── support/index.vue            # Support/donations
│   ├── festival/index.vue           # Festival info
│   ├── programmation/index.vue      # Programming
│   ├── archives/index.vue           # Archives
│   ├── contact/index.vue            # Contact
│   ├── equipe/index.vue             # Team
│   ├── partenaires/index.vue        # Partners
│   ├── invites/index.vue            # Guests
│   ├── offfikas/index.vue           # Off Fikas
│   ├── confidentialite/index.vue    # Privacy policy
│   ├── prog2022/index.vue           # 2022 program
│   ├── prog2024/index.vue           # 2024 program
│   ├── prog2025/index.vue           # 2025 program
│   └── prog-test/index.vue          # Test page
├── layouts/
│   └── default.vue                  # Main layout with header/footer
├── composables/
│   ├── useCookiesConsent.ts         # Cookie consent state management
│   └── useNavigation.ts             # Navigation data from Storyblok
├── storyblok/
│   ├── Page.vue                     # Container for dynamic components
│   ├── Layout.vue                   # Layout with decorative elements
│   ├── Hero.vue                     # Hero image with title overlay
│   ├── HeroVideo.vue                # Video hero with YouTube embed
│   ├── PageHeadline.vue             # Section headlines with optional CTA
│   ├── Edition.vue                  # Festival edition with year list
│   ├── Year.vue                     # Individual year item
│   ├── Paragraph.vue                # Rich text content
│   ├── Cookies.vue                  # Cookie consent banner
│   ├── Donations.vue                # Donations grid container
│   ├── Donation.vue                 # Individual donation card
│   ├── VideoPlayback.vue            # YouTube video embed with CTA
│   ├── History.vue                  # History section container
│   ├── HistoryLeft.vue              # History item (image left)
│   ├── HistoryRight.vue             # History item (image right)
│   ├── Greenblock.vue               # Green background content block
│   ├── Admins.vue                   # Admin section container (uses Avatar)
│   ├── Team.vue                     # Team section container (uses Member)
│   ├── Avatar.vue                   # Circular avatar card
│   ├── Member.vue                   # Team member with rich text name
│   ├── Pinkblock.vue                # Pink CTA block with SVG pattern
│   ├── ArchiveSelector.vue          # Year selector for archives (v-editable)
│   ├── ProgEvents.vue               # Events list container (fetches from Storyblok)
│   └── ProgEvent.vue                # Individual event card with date/time/location
└── components/
    ├── globals/
    │   ├── TheHeader.vue            # Desktop header (tablet-landscape+)
    │   ├── TheHeaderMobile.vue      # Mobile header (< tablet-landscape)
    │   ├── TheFooter.vue            # Footer
    │   ├── DropDown.vue             # Dropdown menu
    │   └── DrawerMenu.vue           # Drawer menu
    ├── archives/
    │   ├── Lightbox.vue             # Image lightbox modal
    │   └── ArchiveYear.vue          # Archive content (photos/videos/prog)
    └── UI/
        ├── Buttons/
        │   ├── Btn.vue              # General purpose button/link
        │   ├── BtnFacebook.vue      # Facebook button
        │   ├── BtnInsta.vue         # Instagram button
        │   ├── BtnYoutube.vue       # YouTube button
        │   └── BtnScrollTop.vue     # Scroll to top button
        ├── Logos/
        │   ├── Logo.vue             # Main SVG logo
        │   └── LogoFooter.vue       # Footer SVG logo
        └── Icons/
            ├── IconVideoScroll.vue  # Scroll down arrow
            ├── IconMore.vue         # "More" arrow icon
            ├── IconClose.vue        # X close button
            ├── IconMenu.vue         # Hamburger menu (animates to X)
            ├── IconMenuDrop.vue     # Dropdown menu icon
            ├── IconDrawer.vue       # +/- toggle (small, purple)
            ├── IconDrawerMap.vue    # +/- toggle (large, white)
            ├── IconNext.vue         # Next arrow
            └── IconPrev.vue         # Previous arrow
```

## Migrated Pages

| Page | Legacy Path | New Path | Status |
|------|-------------|----------|--------|
| Homepage | `legacy/pages/index.vue` | `app/pages/index.vue` | ✅ Done |
| Support | `legacy/pages/support/index.vue` | `app/pages/support/index.vue` | ✅ Done |
| Festival | `legacy/pages/festival/index.vue` | `app/pages/festival/index.vue` | ✅ Done |
| Programmation | `legacy/pages/programmation/index.vue` | `app/pages/programmation/index.vue` | ✅ Done |
| Archives | `legacy/pages/archives/index.vue` | `app/pages/archives/index.vue` | ✅ Done |
| Contact | `legacy/pages/contact/index.vue` | `app/pages/contact/index.vue` | ✅ Done |
| Equipe | `legacy/pages/equipe/index.vue` | `app/pages/equipe/index.vue` | ✅ Done |
| Partenaires | `legacy/pages/partenaires/index.vue` | `app/pages/partenaires/index.vue` | ✅ Done |
| Invites | `legacy/pages/invites/index.vue` | `app/pages/invites/index.vue` | ✅ Done |
| Off Fikas | `legacy/pages/offfikas/index.vue` | `app/pages/offfikas/index.vue` | ✅ Done |
| Confidentialite | `legacy/pages/confidentialite/index.vue` | `app/pages/confidentialite/index.vue` | ✅ Done |
| Prog 2022 | - | `app/pages/prog2022/index.vue` | ✅ Done |
| Prog 2024 | - | `app/pages/prog2024/index.vue` | ✅ Done |
| Prog 2025 | - | `app/pages/prog2025/index.vue` | ✅ Done |

## Next Steps to Continue Migration

1. **Fix Facebook Pixel**: Investigate and fix `nuxt-meta-pixel` implementation issues
2. **Composables**: Create `useMenu()` for menu state
3. **More Storyblok components**: As needed for additional content types
4. **Testing**: Set up Vitest for unit tests
