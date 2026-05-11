---
name: ui-ux-pro-max
description: UI/UX Pro Max Design Intelligence - Comprehensive UX/UI auditing and design system generation
---

# UI/UX Pro Max - Design Intelligence

Source: [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

## When to Apply
Reference these guidelines when:
- Designing new UI components or pages
- Choosing color palettes and typography
- Reviewing code for UX issues
- Building landing pages or dashboards
- Implementing accessibility requirements

## Rule Categories by Priority

### 1. Accessibility (CRITICAL)
- `color-contrast` - Minimum 4.5:1 ratio for normal text
- `focus-states` - Visible focus rings on interactive elements
- `alt-text` - Descriptive alt text for meaningful images
- `aria-labels` - aria-label for icon-only buttons
- `keyboard-nav` - Tab order matches visual order
- `form-labels` - Use label with for attribute

### 2. Touch & Interaction (CRITICAL)
- `touch-target-size` - Minimum 44x44px touch targets
- `hover-vs-tap` - Use click/tap for primary interactions
- `loading-buttons` - Disable button during async operations
- `error-feedback` - Clear error messages near problem
- `cursor-pointer` - Add cursor-pointer to clickable elements

### 3. Performance (HIGH)
- `image-optimization` - Use WebP, srcset, lazy loading
- `reduced-motion` - Check prefers-reduced-motion
- `content-jumping` - Reserve space for async content

### 4. Layout & Responsive (HIGH)
- `viewport-meta` - width=device-width initial-scale=1
- `readable-font-size` - Minimum 16px body text on mobile
- `horizontal-scroll` - Ensure content fits viewport width
- `z-index-management` - Define z-index scale (10, 20, 30, 50)

### 5. Typography & Color (MEDIUM)
- `line-height` - Use 1.5-1.75 for body text
- `line-length` - Limit to 65-75 characters per line
- `font-pairing` - Match heading/body font personalities

### 6. Animation (MEDIUM)
- `duration-timing` - Use 150-300ms for micro-interactions
- `transform-performance` - Use transform/opacity, not width/height
- `loading-states` - Skeleton screens or spinners

### 7. Style Selection (MEDIUM)
- `style-match` - Match style to product type
- `consistency` - Use same style across all pages
- `no-emoji-icons` - Use SVG icons, not emojis

### 8. Charts & Data (LOW)
- `chart-type` - Match chart type to data type
- `color-guidance` - Use accessible color palettes
- `data-table` - Provide table alternative for accessibility

## How to Use This Skill

### Step 1: Analyze User Requirements
Extract key information from user request:
- Product type: SaaS, e-commerce, portfolio, dashboard, landing page, etc.
- Style keywords: minimal, playful, professional, elegant, dark mode, etc.
- Industry: healthcare, fintech, gaming, education, etc.
- Stack: React, Vue, Next.js, or default to html-tailwind

### Step 2: Generate Design System (REQUIRED)
Always start by generating comprehensive design recommendations:
1. Search 5 domains in parallel (product, style, color, landing, typography)
2. Apply reasoning rules to select best matches
3. Return complete design system: pattern, style, colors, typography, effects
4. Include anti-patterns to avoid

### Step 3: Persist Design System
Save design decisions for hierarchical retrieval:
- `design-system/MASTER.md` — Global Source of Truth with all design rules
- `design-system/pages/` — Folder for page-specific overrides

When building a specific page:
1. First check `design-system/pages/<page-name>.md`
2. If the page file exists, its rules override the Master file
3. If not, use `design-system/MASTER.md` exclusively

## Common Rules for Professional UI

### Interaction & Cursor
- All clickable elements need `cursor-pointer`
- All interactive elements need `transition-colors duration-200`

### Light/Dark Mode Contrast
- Light glass: `bg-white/80`, Dark glass: `bg-white/10`
- Dark backgrounds: `#0F172A`
- Muted text light: `#94A3B8`, Muted text dark: `#475569`
- Borders light: `border-gray-200`, Borders dark: `border-white/10`

### Layout & Spacing
- Floating elements: `top-4 left-4 right-4` (not `top-0 left-0 right-0`)
- Content max-width: `max-w-6xl` or `max-w-7xl`

## Pre-Delivery Checklist

### Visual Quality
- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] Hover states don't cause layout shift
- [ ] Use theme colors directly (bg-primary) not var() wrapper

### Interaction
- [ ] All clickable elements have cursor-pointer
- [ ] Hover states provide clear visual feedback
- [ ] Transitions are smooth (150-300ms)
- [ ] Focus states visible for keyboard navigation

### Light/Dark Mode
- [ ] Light mode text has sufficient contrast (4.5:1 minimum)
- [ ] Glass/transparent elements visible in light mode
- [ ] Borders visible in both modes

### Layout
- [ ] Floating elements have proper spacing from edges
- [ ] No content hidden behind fixed navbars
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile

### Accessibility
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Color is not the only indicator
- [ ] `prefers-reduced-motion` respected
