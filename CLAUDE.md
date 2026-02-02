# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

We are building the app described in @SPEC.MD. Read that file for general architectural tasks or to double-check the exact database structure, tech stack or application architecture.

Keep your replies extremely concise and focus on conveying the key information. No unnecessary fluff, no long code snippets.

Whenever working with any third-party library or something similar, you MUST look up the official documentation to ensure that you're working with up-to-date information. Use the docsExplorer subagent for efficient documentation lookup.

## Project Overview

**Fikas** is a festival website being migrated from Nuxt 2 to Nuxt 4.

| Folder    | Framework      | Purpose                                    |
| --------- | -------------- | ------------------------------------------ |
| `legacy/` | Nuxt 2 + Vue 2 | Reference implementation (what to migrate) |
| `app/`    | Nuxt 4 + Vue 3 | Migration target (where to build)          |

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

## Migration Workflow

1. **Pick a feature** from legacy (component, page, or system)
2. **Read the legacy code** to understand functionality
3. **Create in app/** using Nuxt 4 patterns (TypeScript, Composition API)
4. **Test** with `pnpm dev`
5. **Repeat** for next feature

Maintain the same folder organization from legacy. Adapt code to Vue 3/Nuxt 4 idioms rather than direct copy-paste.

## Additional Documentation

- **[.claude/SPEC.md](.claude/SPEC.md)** - Architecture, technical patterns, and coding conventions
- **[.claude/MIGRATION.md](.claude/MIGRATION.md)** - Migration progress tracking (done/todo)

## Working Style

- Show proposed changes before executing
- Wait for explicit approval before creating/modifying files
- Work step-by-step with validation at each stage
- No batch operations without review
