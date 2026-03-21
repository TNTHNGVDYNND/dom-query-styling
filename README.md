# DOM Query Styling

A beginner-friendly project for learning how to manipulate web pages with JavaScript.

---

## What You'll Build

A dynamic restaurant menu where food items appear styled, change color on hover, and respond to clicks. It starts simple and evolves into a well-organized, professional codebase.

---

## What You'll Learn

| Concept | What It Means |
|---------|---------------|
| **DOM** | The "tree structure" of your HTML - a way to access and change web page elements |
| **CSS Classes** | Reusable style definitions that can be added/removed from elements |
| **Functions** | Reusable blocks of code that perform specific tasks |
| **OOP** | Organizing code into "objects" with properties and methods |
| **ES Modules** | Separate files that can share code with each other |
| **Method Chaining** | Writing code like `$.addClass().on().css()` - methods that follow each other |

---

## Features

### Core Functionality
- **Dynamic Menu Rendering** - Menu items rendered from JavaScript
- **Real-time Search** - Filter menu items as you type
- **Interactive Hover Effects** - Visual feedback on user interaction
- **Staggered Animations** - Smooth entrance animations for menu items
- **Responsive Design** - Works on mobile, tablet, and desktop

### User Interactions
| Feature | Description |
|---------|-------------|
| Search Filtering | Type in the search box to filter menu items instantly |
| Hover Effects | Food items change color on mouse hover |
| Button Click | Click the button to display entered values |
| Keyboard Navigation | Full keyboard support with visible focus indicators |
| Touch Support | Mobile-friendly touch targets and interactions |

### Technical Features
| Feature | Description |
|---------|-------------|
| Error Handling | Graceful handling of missing DOM elements |
| Input Validation | User input validation with visual feedback |
| Debug Mode | Development mode with console warnings |
| Configuration-Driven | Centralized settings in config.js |
| JSDoc Documentation | Well-documented codebase |

---

## Accessibility

This project implements **WCAG 2.1 Level AA** accessibility standards.

### Keyboard Accessibility
- Full keyboard navigation support
- Visible focus indicators (3px yellow outline)
- Skip link to main content
- Tab navigation through all interactive elements

### Screen Reader Support
- Semantic HTML structure (`<header>`, `<main>`, `<footer>`)
- ARIA labels and descriptions
- `aria-labelledby` for section headings
- `aria-label` for form controls
- Hidden labels for visual-only content

### Visual Accessibility
- High contrast focus indicators
- Minimum touch target size (44px)
- Color not used as sole indicator
- Readable font sizes at all breakpoints

---

## Performance

| Metric | Value |
|--------|-------|
| **Page Size** | ~15KB (HTML + CSS + JS) |
| **Dependencies** | None (vanilla JS only) |
| **Load Time** | < 100ms |
| **Rendering** | Immediate (no framework overhead) |

### Optimization Techniques
- Minimal DOM queries with caching
- CSS transitions (GPU-accelerated)
- Efficient event delegation
- Debounced search input

---

## Quick Start

1. **Clone the repo:**
   ```bash
   git clone <repo-url>
   ```

2. **Open the project:**
   ```bash
   # Open index.html in your browser
   # Or use a local server:
   npx serve .
   ```

3. **Try it out:**
   - Type in the search box to filter menu items
   - Hover over food items to see color changes
   - Click the button to trigger an event
   - Use Tab to navigate with keyboard
   - Resize browser to see responsive design

---

## File Structure

```
dom-query-styling/
├── index.html           (main page structure)
├── styles.css           (all visual styles)
├── PLAN.md              (developer notes - how the project evolved)
├── ARCHITECTURE.md      (design decisions and tradeoffs)
└── src/
    ├── main.js          (entry point - runs everything)
    ├── dom.js           (DOM manipulation class)
    ├── styles.js        (CSS class definitions)
    ├── events.js        (event handler functions)
    ├── data.js          (content and configuration)
    └── config.js        (centralized settings)
```

---

## Architecture

This project demonstrates a **configuration-driven** approach with **modular architecture**:

```
┌─────────────────────────────────────────────────────────┐
│                      main.js                             │
│                   (Entry Point)                         │
└─────────────────────┬───────────────────────────────────┘
                      │ imports
┌─────────────────────┴───────────────────────────────────┐
│                   src/                                   │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │  dom.js │  │styles.js│  │events.js│  │ config  │   │
│  │  (OOP)  │  │(styles) │  │(events) │  │ (config)│   │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │
└─────────────────────────────────────────────────────────┘
```

For detailed architecture decisions, see [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## Technologies

- **HTML5** - Semantic markup and accessibility
- **CSS3** - Visual styling, animations, and responsive design
- **JavaScript (ES6+)** - DOM manipulation, ES modules, classes

No frameworks or libraries - just pure vanilla JavaScript!

---

## The Learning Journey

This project evolves through versions, each teaching a new concept. See the `v1` branch to view the original starting point - 116 lines of JavaScript with all inline styles.

### v1.1 - Starting Point
Everything in one file with inline styles. See branch `v1` to explore the original code.

### v1.2 - CSS Classes
Move styles to CSS classes. Learn `.classList.add()`.

```javascript
// Before (inline styles)
element.style.backgroundColor = 'red';

// After (CSS classes)
element.classList.add('btn-primary');
```

### v1.3 - Helper Functions
Create shortcuts to avoid repetition.

```javascript
// Before - repeating querySelector
document.querySelector('.menu').classList.add('active');
document.querySelector('.menu').style.color = 'red';

// After - one helper for everything
const $ = (selector) => document.querySelector(selector);
$('.menu').addClass('active').css({ color: 'red' });
```

### v1.4 - DOM Class
Organize helpers into a reusable class with method chaining.

```javascript
class DOM {
    addClass(...names) { /* ... */ return this; }
    css(styles) { /* ... */ return this; }
    on(event, handler) { /* ... */ return this; }
}

const $ = (selector) => new DOM(selector);

// Chain methods together
$('.btn').addClass('primary').on('click', handleClick);
```

### v1.5 - ES Modules
Split code into separate files by purpose.

```
src/
├── dom.js      (DOM class)
├── styles.js   (style definitions)
├── events.js   (event handlers)
├── data.js     (data/config)
└── main.js     (entry point)
```

### v1.6 - Query & Style Utilities
Add `$$` for selecting multiple elements and utility functions.

```javascript
// $ finds the first match
const title = $('.title');        // Returns one element

// $$ finds ALL matches
const items = $$('.food-item');  // Returns a NodeList
items.forEach(item => item.textContent = 'New Item');
```

### v2.0 - Polish & Patterns
Add configuration, error handling, and documentation.

---

## Key Concepts Explained

### What is the DOM?

The Document Object Model (DOM) is your browser's way of representing HTML as a tree:

```
html
├── head
│   └── title
└── body
    ├── h1  ← You can "query" and change these
    ├── section
    │   └── li
    └── footer
```

JavaScript can "talk to" this tree to read or change elements.

### What is `$`?

A shorthand for `document.querySelector()` - it's just a shortcut:

```javascript
// These do the exact same thing:
const el = document.querySelector('.menu');
const el = $('.menu');
```

### What is `$$`?

A shorthand for `document.querySelectorAll()` - finds ALL matching elements:

```javascript
// Finds first .item (single element)
$('.item')

// Finds ALL .item (NodeList of elements)
$$('.item')
```

### What is Method Chaining?

Calling multiple methods in one line. Each method returns `this`:

```javascript
// Without chaining - 3 lines
$('.btn').addClass('primary');
$('.btn').css({ color: 'white' });
$('.btn').on('click', handleClick);

// With chaining - 1 line
$('.btn').addClass('primary').css({ color: 'white' }).on('click', handleClick);
```

---

## For Developers

| Resource | Description |
|----------|-------------|
| [PLAN.md](./PLAN.md) | Complete technical roadmap and implementation details |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Design decisions, tradeoffs, and patterns |

## Branches

| Branch | Description |
|--------|-------------|
| `main` | Current version (v2.6) - fully refactored with all features |
| `v1` | Original starting point - single file with inline styles |
| `v1.4` | DOM Class (OOP) version |

---

## License

MIT License - Feel free to use this project for learning purposes.
