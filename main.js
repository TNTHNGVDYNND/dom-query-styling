// v1.3 - Helper Functions (DRY Principle)

// ============================================
// UTILITY FUNCTIONS
// ============================================

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

const applyStyles = (elements, classNames) => {
    const els = typeof elements === 'string' ? $$(elements) : elements;
    const classes = typeof classNames === 'string' ? [classNames] : classNames;
    els.forEach(el => classes.forEach(cls => el.classList.add(cls)));
};

const createElement = (tag, classNames = [], text = '') => {
    const el = document.createElement(tag);
    const classes = typeof classNames === 'string' ? [classNames] : classNames;
    classes.forEach(cls => el.classList.add(cls));
    el.textContent = text;
    return el;
};

const addHoverEffect = (element, enterCallback, leaveCallback) => {
    element.addEventListener('mouseenter', enterCallback);
    element.addEventListener('mouseleave', leaveCallback);
};

// ============================================
// STYLING
// ============================================

// Body
document.body.classList.add('body-dark');

// Title
$('h1').classList.add('title-hero');

// Category titles
applyStyles('.category', 'category-title');

// Main layout
$('main').classList.add('menu-layout');

// Menu category cards
applyStyles('.menu-category', 'menu-category-card');

// Food items
applyStyles('.food-item', 'food-item');

// Footer
$('footer').classList.add('footer-card');

// Input field
$('.guess').classList.add('input-styled');

// Button
const btnCheck = $('.btn-check');
btnCheck.classList.add('btn-primary');
addHoverEffect(btnCheck,
    () => btnCheck.style.backgroundColor = '#FF0000',
    () => btnCheck.style.backgroundColor = '#DC2743'
);

// Sections
$$('section').forEach((section, index) => {
    section.classList.add('section-padded');
    if (index === 0) section.classList.add('section-starters');
    if (index === 1) section.classList.add('section-mains');
    if (index === 2) section.classList.add('section-desserts');
});

// ============================================
// DYNAMIC CONTENT
// ============================================

const startersList = $('.menu-category');
const newItem = createElement('li', 'food-item', 'Item-4');
startersList.appendChild(newItem);

// ============================================
// EVENT HANDLERS
// ============================================

btnCheck.addEventListener('click', () => {
    const inputGuess = $('.guess');
    alert(`Your number: ${inputGuess.value}`);
    inputGuess.value = '';
});

// ============================================
// DYNAMIC UPDATES
// ============================================

document.title = 'Welcome to the Updated Menu!';
$('.title').textContent = 'Welcome to the Updated Menu!';
