---
name: tailwind-design-system
description: Tailwind Design System (v4) - Build production-ready design systems with Tailwind CSS v4
---

# Tailwind Design System (v4)

Source: [wshobson/agents](https://github.com/wshobson/agents)

Build production-ready design systems with Tailwind CSS v4, including CSS-first configuration, design tokens, component variants, responsive patterns, and accessibility.

> **Note:** This skill targets Tailwind CSS v4 (2024+). For v3 projects, refer to the [upgrade guide](https://tailwindcss.com/docs/upgrade-guide).

## When to Use This Skill
- Creating a component library with Tailwind v4
- Implementing design tokens and theming with CSS-first configuration
- Building responsive and accessible components
- Standardizing UI patterns across a codebase
- Migrating from Tailwind v3 to v4
- Setting up dark mode with native CSS features

## Key v4 Changes
| v3 | v4 |
|---|---|
| `tailwind.config.ts` | `@theme` |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` |
| `darkMode: "class"` | `@custom-variant dark (&:where(.dark, .dark *))` |
| `theme.extend.colors` | `@theme { --color-*: value }` |
| `require("tailwindcss-animate")` | `@keyframes` + `@theme` + `@starting-style` |

## Core Concepts

### 1. Design Token Hierarchy
```
Brand Tokens (abstract)
  └── Semantic Tokens (purpose)
        └── Component Tokens (specific)

Example: oklch(45% 0.2 260) → --color-primary → bg-primary
```

### 2. Component Architecture
```
Base styles → Variants → Sizes → States → Overrides
```

## Quick Start - CSS-first Configuration
```css
/* app.css - Tailwind v4 CSS-first configuration */
@import "tailwindcss";

@theme {
  /* Semantic color tokens using OKLCH */
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(14.5% 0.025 264);
  --color-primary: oklch(14.5% 0.025 264);
  --color-primary-foreground: oklch(98% 0.01 264);
  --color-secondary: oklch(96% 0.01 264);
  --color-muted: oklch(96% 0.01 264);
  --color-muted-foreground: oklch(46% 0.02 264);
  --color-accent: oklch(96% 0.01 264);
  --color-destructive: oklch(53% 0.22 27);
  --color-border: oklch(91% 0.01 264);
  --color-ring: oklch(14.5% 0.025 264);
  --color-card: oklch(100% 0 0);

  /* Radius tokens */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;

  /* Animation tokens */
  --animate-fade-in: fade-in 0.2s ease-out;
  --animate-slide-in: slide-in 0.3s ease-out;

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slide-in {
    from { transform: translateY(-0.5rem); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
}

/* Dark mode */
@custom-variant dark (&:where(.dark, .dark *));

.dark {
  --color-background: oklch(14.5% 0.025 264);
  --color-foreground: oklch(98% 0.01 264);
  --color-primary: oklch(98% 0.01 264);
  --color-border: oklch(22% 0.02 264);
  --color-card: oklch(14.5% 0.025 264);
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground antialiased; }
}
```

## v3 to v4 Migration Checklist
- [ ] Replace `tailwind.config.ts` with `@theme` in CSS
- [ ] Replace `@tailwind` directives with `@import "tailwindcss"`
- [ ] Move color definitions to `@theme { --color-*: value }`
- [ ] Replace `darkMode: "class"` with `@custom-variant`
- [ ] Move keyframes into `@theme` block
- [ ] Replace plugin-based animations with native `@keyframes`
- [ ] Test all responsive breakpoints

## Best Practices

### Do's
- Use OKLCH for better color perception
- Define semantic color tokens (primary, secondary, etc.)
- Use CSS-first configuration with `@theme`
- Create component variants with CVA (Class Variance Authority)
- Use container queries for component-level responsiveness
- Define animation tokens in `@theme`

### Don'ts
- Don't use `tailwind.config.ts` for new v4 projects
- Don't hardcode colors — use design tokens
- Don't use `@apply` for complex logic — use CSS custom properties
- Don't skip dark mode testing
- Don't use arbitrary values when a token exists
