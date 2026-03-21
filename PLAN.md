# DOM-Query Styling Refactoring Plan

## Project Overview
A vanilla JavaScript DOM manipulation and styling project for learning purposes.  
**Current:** v1.1 (basic inline styles, single file)  
**Goal:** v2.0 (clean architecture, modular structure)

---

## Version Roadmap

```
v1.1 (START)
    ↓
v1.2 ← CSS Classes (Semantic)
    ↓
v1.3 ← Helper Functions (DRY)
    ↓
v1.4 ← DOM Class (OOP)
    ↓
v1.5 ← ES Modules (Organization)
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

## v1.4: DOM Class (OOP)

### Learning Goals
- JavaScript Classes
- Encapsulation
- Method chaining
- `this` keyword

### Planned Changes
New file: `dom.js`
```javascript
class DOM {
    constructor(selector) { ... }
    addClass(...classNames) { return this; }
    addClassAll(...classNames) { return this; }
    css(styles) { return this; }
    on(event, handler) { return this; }
    onAll(event, handler) { return this; }
}
const $ = (selector) => new DOM(selector);
```

---

## v1.5: ES Modules (Organization)

### Learning Goals
- ES6 Modules (import/export)
- Module separation by concern
- default vs named exports

### Planned File Structure
```
src/
├── dom.js          (DOM utility class)
├── styles.js       (CSS class mappings)
├── events.js      (Event handlers)
├── data.js        (Dynamic data/config)
└── main.js        (Entry point)
```

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
