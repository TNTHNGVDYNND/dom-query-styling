# DOM-Query Styling Refactoring Plan

## Project Overview
A vanilla JavaScript DOM manipulation and styling project for learning purposes, focused on:
- **DOM Query**: Mastering `querySelector`, `querySelectorAll`, and traversal
- **DOM Styling**: Dynamic style manipulation, class toggling, and CSS-in-JS

**Current:** v1.6 (Query & Style Enhancements)  
**Goal:** v2.0 (clean architecture, polish & patterns)

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
v2.0 ← Polish & Patterns
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
    addClass(...classNames) { return this; }      // Chain: $.addClass()
    addClassAll(...classNames) { return this; }    // Chain: $.addClassAll()
    css(styles) { return this; }                  // Chain: $.css({})
    on(event, handler) { return this; }           // Chain: $.on('click', fn)
    onAll(event, handler) { return this; }       // Chain: $.onAll()
    append(child) { return this; }               // Chain: $.append()
    static create(tag, classNames, text) { }     // Static: DOM.create()
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
    elements.forEach(el => Object.assign(el.style, styleObject));
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

## v2.0: Polish & Patterns

### Learning Goals
- Configuration-driven approach
- Clean architecture principles
- Best practices

### Planned Changes
- Centralized config.js
- Better error handling
- JSDoc documentation
