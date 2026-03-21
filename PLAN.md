# DOM-Query Styling Refactoring Plan

## Project Overview

A vanilla JavaScript DOM manipulation and styling project for learning purposes, focused on:

- **DOM Query**: Mastering `querySelector`, `querySelectorAll`, and traversal
- **DOM Styling**: Dynamic style manipulation, class toggling, and CSS-in-JS

**Current:** v2.6 (Portfolio Documentation) ✅  
**Goal:** Complete - Production-ready, accessible, responsive codebase

---

## Version Roadmap

```
v1.1 (START)
    ↓
v1.2 ← CSS Classes (Semantic) ✅
    ↓
v1.3 ← Helper Functions (DRY) ✅
    ↓
v1.4 ← DOM Class (OOP) ✅
    ↓
v1.5 ← ES Modules (Organization) ✅
    ↓
v1.6 ← Query & Style Enhancements ✅
    ↓
v2.0 ← Polish & Patterns ✅
    ↓
v2.1 ← Search & Filter ✅
    ↓
v2.2 ← JavaScript Animations ✅
    ↓
v2.3 ← Accessibility Foundation ✅
    ↓
v2.4 ← Responsive Design Polish ✅
    ↓
v2.5 ← Error Handling & Robustness ✅
    ↓
v2.6 ← Portfolio Documentation ✅
```

---

## v1.2: CSS Classes Refactor ✅

### Learning Goals

- CSS classes vs inline styles
- `.classList` API
- Separation of concerns (HTML/CSS/JS)

### Files Changed

- `index.html` - Added link to styles.css
- `main.js` - Replaced inline styles with classList.add()
- `styles.css` - NEW - All CSS classes

---

## v1.3: Helper Functions (DRY Principle) ✅

### Learning Goals

- Functions as abstraction
- DRY (Don't Repeat Yourself)
- Higher-order functions

### Implemented Utilities

```javascript
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const applyStyles = (elements, classNames) => { ... };
const createElement = (tag, classNames, text) => { ... };
const addHoverEffect = (element, enterCallback, leaveCallback) => { ... };
```

### Benefits

- Reduced code repetition
- Cleaner, more readable code
- Reusable utilities

---

## v1.4: DOM Class (OOP) ✅

### Learning Goals

- JavaScript Classes
- Encapsulation
- Method chaining
- `this` keyword

### Implemented Class

```javascript
class DOM {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.elements = document.querySelectorAll(selector);
  }
  addClass(...classNames) {
    return this;
  } // Chain: $.addClass()
  addClassAll(...classNames) {
    return this;
  } // Chain: $.addClassAll()
  css(styles) {
    return this;
  } // Chain: $.css({})
  on(event, handler) {
    return this;
  } // Chain: $.on('click', fn)
  onAll(event, handler) {
    return this;
  } // Chain: $.onAll()
  append(child) {
    return this;
  } // Chain: $.append()
  static create(tag, classNames, text) {} // Static: DOM.create()
}
const $ = (selector) => new DOM(selector);
```

### Benefits

- Method chaining for fluent API
- Encapsulated DOM operations
- Single source of truth for DOM utilities
- `.element` for direct access, `.elements` for NodeList

---

## v1.5: ES Modules (Organization) ✅

### Learning Goals

- ES6 Modules (import/export)
- Module separation by concern
- Named vs default exports

### File Structure

```
src/
├── dom.js          (DOM utility class)  - default + named export
├── styles.js       (CSS class mappings)   - named exports
├── events.js      (Event handlers)        - named exports
├── data.js        (Dynamic data/config)   - named exports
└── main.js        (Entry point)           - imports all
```

### Key Concepts Learned

- `import { x }` vs `import x default`
- `export const` vs `export default`
- `type="module"` in script tag
- Separation by feature/concern

---

## v1.6: Query & Style Enhancements ✅

### Learning Goals

- DOM Query API (`querySelectorAll`, `querySelector`)
- Query selector best practices
- Styling utilities for rapid development
- Animation and transition helpers

### Implemented Additions

```javascript
// src/dom.js - Query shorthand (ALIGNED WITH PROJECT NAME "dom-query")
export const $$ = (selector) => document.querySelectorAll(selector);

// src/styles.js - Style utility functions
export const applyStyles = (elements, styleObject) => {
  elements.forEach((el) => Object.assign(el.style, styleObject));
  return elements;
};

export const toggleClass = (element, className) => {
  element.classList.toggle(className);
  return element;
};
```

### Benefits

- `$$` selector matches project naming convention "dom-query"
- Direct NodeList access for iteration without wrapping
- Style utilities for rapid CSS-in-JS development
- Better alignment with project focus on DOM querying and styling

### Files Changed

- `src/dom.js` - Added `$$` export
- `src/styles.js` - Added `applyStyles()` and `toggleClass()` utilities
- `src/main.js` - Demonstrates new utilities
- `styles.css` - Added `.footer-active` class

---

## v2.0: Polish & Patterns ✅

### Learning Goals

- Configuration-driven approach
- Clean architecture principles
- Best practices
- JSDoc documentation

---

## v2.0.1: Cumulative Layout Shift (CLS) Optimization ✅

### Learning Goals
- Web performance metrics (Core Web Vitals)
- Avoiding layout shifts during animations
- Performance best practices

### Issue Identified
- **CLS Score:** 0.329 (Poor — target < 0.1)
- **Root Causes:**
  1. Staggered entrance animations causing initial layout recalculation
  2. Search filtering using `display: none` causing reflow
  3. "No results" message insertion/removal during search

### Implemented Fixes

#### 1. **Search Filtering Optimization** ✅
- Changed `.hidden` from `display: none` to `visibility: hidden + opacity: 0`
- Preserves DOM space while visually hiding elements
- Smooth transitions without layout shift
- **Impact:** Eliminates reflow during search filtering

#### 2. **Pre-allocated Space** ✅
- Added `min-height` to `.food-item` elements
- Added `will-change: opacity, transform` hints
- Added `contain: layout style paint` for paint containment
- **Impact:** Browser pre-calculates layout, preventing shifts

#### 3. **Disabled Staggered Entrance Animations** ✅
- Commented out `stagger()` on page load in `src/main.js`
- These animations were causing layout recalculation as elements moved
- Methods still available for on-demand use (hover, interactive)
- **Impact:** Eliminates ~80% of CLS on initial load

#### 4. **"No Results" Message Handling** ✅
- Changed from `.classList.toggle('hidden')` to visibility/opacity controls
- Uses height transitions instead of display toggling
- **Impact:** Smooth show/hide without layout shift

### Files Updated
- `styles.css` - Updated `.hidden`, `.food-item`, `.section-padded`, animations
- `src/main.js` - Commented out staggered entrance animations
- `src/events.js` - Updated search filter to use visibility/opacity

### Performance Impact (Expected)
| Metric | Before | After | Target |
|--------|--------|-------|--------|
| **CLS** | 0.329 (Poor) | ~0.05 (Good) | < 0.1 |
| **LCP** | No change | No change | < 2.5s |
| **FID** | No change | No change | < 100ms |

### Future Enhancements
- Option to re-enable staggered animations via config (performance trade-off)
- Entrance animations on interaction (scroll, hover) instead of load
- Consider `content-visibility: auto` for large lists (if menu grows)

### Learning Points
- Layout shifts occur from size/position changes, not opacity/transform
- `transform` and `opacity` animations don't trigger reflow (GPU-accelerated)
- `display: none` causes layout thrashing; use `visibility` + `opacity` instead
- `contain: paint` hints help browser optimize rendering
- `will-change` tells browser which properties will animate

### Implemented Changes

- Centralized `src/config.js` with selectors, events, app settings
- Better error handling with debug mode in DOM class
- JSDoc documentation on all modules and exports

### File Structure

```
src/
├── config.js       (Centralized configuration) - named exports
├── dom.js          (DOM utility class)  - default + named export
├── styles.js       (CSS class mappings + utilities) - named exports
├── events.js       (Event handlers) - named exports
├── data.js         (Dynamic data/config) - named exports
└── main.js         (Entry point) - imports all
```

### Files Created

- `src/config.js` - Centralized configuration with selectors and debug utility

### Files Updated

- `src/dom.js` - Added JSDoc, error handling with debug logging
- `src/styles.js` - Added JSDoc, null check in toggleClass
- `src/events.js` - Added JSDoc, null check in setupButtonClick
- `src/data.js` - Added JSDoc documentation
- `src/main.js` - Uses config.selectors, updated documentation

### Implementation Details

#### 1. Centralized Config (config.js)

```javascript
export const config = {
  app: {
    title: "The Menu",
    debug: false,
  },
  selectors: {
    body: "body",
    title: "h1",
    main: "main",
    sections: "section",
    footer: "footer",
    foodItems: ".food-item",
    categories: ".category",
    menuCategories: ".menu-category",
    button: ".btn-check",
    input: ".guess",
  },
  events: {
    button: ["mouseenter", "mouseleave", "click"],
    foodItem: ["mouseenter", "mouseleave"],
  },
};
```

#### 2. Error Handling

- Null checks for DOM queries
- Graceful degradation
- Console warnings in debug mode

#### 3. JSDoc Documentation

- Document all exports with @param, @returns
- Type definitions
- Usage examples

---

## v2.1: Enhanced Interactivity - Search & Filter ⧗ TODO

### Learning Goals

- Form handling and input events
- Real-time filtering and state
- Dynamic DOM updates
- User feedback and error messages

### Implemented Changes

- Wire `.guess` input field for real-time menu search
- Filter `.food-item` elements by name/text content
- Display "no results" message when filter returns empty
- Clear search functionality
- Highlight matching items

### File Structure

```
src/
├── config.js       (Add search settings) - updated
├── dom.js          (No changes)
├── styles.js       (No changes)
├── events.js       (Add search handler) - updated
├── data.js         (No changes)
└── main.js         (Add search setup) - updated
```

### Files to Create

- None (reuse existing structure)

### Files to Update

- `src/config.js` - Add `selectors.input`, search settings
- `src/events.js` - Add `setupSearchFilter()` handler
- `src/main.js` - Call search setup
- `index.html` - Add aria labels to input/button
- `styles.css` - Add `.no-results`, `.search-active` classes

### Implementation Details

1. **Input Event Handler** - Capture input value on `input` event
2. **Filter Logic** - Compare input against food item text; toggle visibility
3. **Empty State** - Show/hide "no results" message based on matches
4. **Visual Feedback** - Highlight active search, subtle color changes

---

## v2.2: JavaScript Animations & Transitions ⧗ TODO

### Learning Goals

- CSS animation control via JavaScript
- Timing and sequencing
- Smooth transitions and entrance effects
- Performance optimization

### Implemented Changes

- Add animation methods to DOM class (`.fadeIn()`, `.slideIn()`, `.delay()`)
- Animate menu items on page load with staggered entrance
- Smooth transitions for search results (fade in/out)
- Transition animations on interactive elements
- Remove/animate hidden items smoothly

### File Structure

```
src/
├── config.js       (Add animation settings) - updated
├── dom.js          (Add animation methods) - updated
├── styles.js       (No changes)
├── events.js       (No changes)
├── data.js         (No changes)
└── main.js         (Call animations on load) - updated
```

### Files to Update

- `src/dom.js` - Add methods: `fadeIn(duration)`, `slideIn(duration)`, `fadeOut(duration)`, `delay(ms)`, `stagger(elements, duration, offset)`
- `src/config.js` - Add animation timing constants
- `src/main.js` - Trigger staggered entrance animation on menu items
- `styles.css` - Add animation keyframes and transition classes

### Implementation Details

1. **Fade Animations** - Control opacity with transitions
2. **Slide Animations** - Use transform: translateX/Y for smooth sliding
3. **Stagger Effect** - Apply animation delays to sequential items
4. **Method Chaining** - Ensure animations return `this` for chainability

---

## v2.3: Accessibility Foundation ⧗ TODO

### Learning Goals

- WCAG 2.1 Level AA standards
- ARIA attributes and semantic HTML
- Keyboard navigation
- Screen reader support
- Focus management

### Implemented Changes

- Add ARIA labels (`aria-label`, `aria-describedby`, `role`)
- Semantic HTML refinement
- Keyboard navigation (Tab, Enter, Escape)
- Visible focus indicators
- Skip link (optional)
- Announce search results to screen readers
- Ensure all interactive elements are keyboard accessible

### File Structure

```
index.html         (Add ARIA, semantic refinement) - updated
styles.css         (Add focus indicator styles) - updated
src/
├── config.js       (No changes)
├── dom.js          (Add focus/blur methods) - updated
├── styles.js       (No changes)
├── events.js       (Add keyboard handlers) - updated
├── data.js         (No changes)
└── main.js         (Add keyboard setup) - updated
```

### Files to Update

- `index.html` - Add ARIA attributes, semantic labels, skip links
- `styles.css` - Add `:focus`, `:focus-visible` styles with visible indicators
- `src/dom.js` - Add `.focus()`, `.blur()` methods
- `src/events.js` - Add keyboard event handlers for Tab, Enter, Escape
- `src/main.js` - Setup keyboard navigation

### Implementation Details

1. **ARIA Labels** - `aria-label`, `aria-describedby` for searchbox, results
2. **Focus Indicators** - Yellow/blue outline on focused elements (2–3px)
3. **Keyboard Handlers** - Trap focus in modals (if any), allow Tab navigation
4. **Screen Reader Text** - Hidden labels for visual-only content
5. **Form Semantics** - Use `<label>` and `<button>` properly

---

## v2.4: Responsive Design Polish ⧗ TODO

### Learning Goals

- Mobile-first responsive design
- Media query optimization
- Touch-friendly interfaces
- Cross-device testing

### Implemented Changes

- Test and refine media queries (mobile: 375px, tablet: 768px, desktop: 1024px+)
- Add touch-friendly states (`:active` instead of `:hover` for mobile)
- Optimize flexbox layout for all screen sizes
- Adjust font sizes, spacing for readability on small screens
- Test on actual devices and DevTools
- No layout breaks or horizontal scroll

### File Structure

```
styles.css    (Refine media queries, touch states) - updated
index.html    (Link meta viewport tag for proper scaling) - review
```

### Files to Update

- `styles.css` - Add/refine media queries, `:active` states, responsive spacing

### Implementation Details

1. **Mobile First** - Base styles for mobile, then expand with media queries
2. **Breakpoints** - 375px (mobile), 768px (tablet), 1024px (desktop)
3. **Touch Targets** - Buttons/inputs min 44–48px for touch
4. **Responsive Typography** - Font sizes scale with viewport
5. **Spacing** - Padding/margin adjust for smaller screens
6. **Flexbox Flexibility** - Column layout on mobile, row on desktop

---

## v2.5: Error Handling & Production Robustness ⧗ TODO

### Learning Goals

- Defensive programming practices
- Input validation
- Error recovery
- User feedback
- Graceful degradation

### Implemented Changes

- Validate search input (non-empty, max length)
- Check for missing DOM elements with helpful error messages
- Graceful fallback if data is missing
- User-friendly validation messages
- Prevent invalid state transitions
- Safe error logging in debug mode

### File Structure

```
src/
├── config.js       (Add validation rules) - updated
├── dom.js          (Enhanced error handling) - updated
├── styles.js       (No changes)
├── events.js       (Add validation) - updated
├── data.js         (No changes)
└── main.js         (No changes)
```

### Files to Update

- `src/config.js` - Add validation rules (input max length, etc.)
- `src/dom.js` - Enhanced null checks, helpful error messages in debug mode
- `src/events.js` - Validate search input before filtering
- `styles.css` - Add `.error`, `.invalid-input` classes for user feedback

### Implementation Details

1. **Input Validation** - Check for empty, whitespace, max length
2. **DOM Fallbacks** - Graceful handling if querySelector returns null
3. **Error Messages** - User-friendly feedback when validation fails
4. **State Guards** - Prevent invalid operations (e.g., animate null element)
5. **Debug Logging** - Console warnings in development mode

---

## v2.6: Portfolio Documentation & Deployment ⧗ TODO

### Learning Goals

- Professional code documentation
- Architecture decision records
- Portfolio presentation
- Deployment and live demos

### Implemented Changes

- Expand README with "Features", "Accessibility", "Live Demo" sections
- Add inline comments explaining _why_ patterns were chosen
- Create ARCHITECTURE.md with design decisions
- Setup GitHub Pages deployment (live demo link)
- Add GIF/video demo of interactivity in README
- Link to accessibility audit results (WAVE, axe)

### File Structure

```
README.md               (Expanded with portfolio sections) - updated
ARCHITECTURE.md         (NEW - Design decisions) - created
PLAN.md                (Complete) - finalized
.github/workflows/      (Optional - GitHub Pages deployment) - created
docs/                   (Optional - Extended docs) - created
```

### Files to Create

- `ARCHITECTURE.md` - Why each pattern was chosen, tradeoffs, scalability notes
- `.github/workflows/pages.yml` (optional) - Auto-deploy to GitHub Pages

### Files to Update

- `README.md` - Add sections: Features, Accessibility, Performance, Live Demo, Architecture Overview

### Implementation Details

1. **README Expansion**
   - Features: What the app does
   - Accessibility: WCAG level, keyboard support, screen reader friendly
   - Performance: Page load time, rendering efficiency
   - Live Demo: Link to deployed version
   - Architecture: Brief overview with link to ARCHITECTURE.md

2. **ARCHITECTURE.md**
   - Why OOP with DOM class
   - Why configuration-driven approach
   - Tradeoffs: Vanilla JS vs framework
   - How to extend with new features
   - Scalability considerations

3. **Video/GIF Demo**
   - Show search filtering
   - Show animations
   - Show keyboard navigation
   - Show responsive design

4. **GitHub Pages**
   - Simple deployment via GitHub Settings
   - Live URL in README and repo description
