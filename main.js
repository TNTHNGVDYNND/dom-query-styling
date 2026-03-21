// v1.4 - DOM Class (OOP)

class DOM {
    constructor(selector) {
        this.element = document.querySelector(selector);
        this.elements = document.querySelectorAll(selector);
    }

    addClass(...classNames) {
        if (this.element) this.element.classList.add(...classNames);
        return this;
    }

    addClassAll(...classNames) {
        this.elements.forEach(el => el.classList.add(...classNames));
        return this;
    }

    css(styles) {
        if (this.element) Object.assign(this.element.style, styles);
        return this;
    }

    on(event, handler) {
        if (this.element) this.element.addEventListener(event, handler);
        return this;
    }

    onAll(event, handler) {
        this.elements.forEach(el => el.addEventListener(event, handler));
        return this;
    }

    append(child) {
        if (this.element) this.element.appendChild(child);
        return this;
    }

    static create(tag, classNames = [], text = '') {
        const el = document.createElement(tag);
        const classes = typeof classNames === 'string' ? [classNames] : classNames;
        classes.forEach(cls => el.classList.add(cls));
        el.textContent = text;
        return el;
    }
}

const $ = (selector) => new DOM(selector);

// ============================================
// STYLING
// ============================================

$('body').addClass('body-dark');
$('h1').addClass('title-hero');
$('.category').addClassAll('category-title');
$('main').addClass('menu-layout');
$('.menu-category').addClassAll('menu-category-card');
$('.food-item').addClassAll('food-item');
$('footer').addClass('footer-card');
$('.guess').addClass('input-styled');

// Button
const btnCheck = $('.btn-check');
btnCheck.addClass('btn-primary');
btnCheck.on('mouseenter', () => btnCheck.css({ backgroundColor: '#FF0000' }));
btnCheck.on('mouseleave', () => btnCheck.css({ backgroundColor: '#DC2743' }));

// Sections
$('section').elements.forEach((section, index) => {
    section.classList.add('section-padded');
    if (index === 0) section.classList.add('section-starters');
    if (index === 1) section.classList.add('section-mains');
    if (index === 2) section.classList.add('section-desserts');
});

// ============================================
// DYNAMIC CONTENT
// ============================================

$('.menu-category').append(DOM.create('li', 'food-item', 'Item-4'));

// ============================================
// EVENT HANDLERS
// ============================================

btnCheck.on('click', () => {
    alert(`Your number: ${$('.guess').element.value}`);
    $('.guess').element.value = '';
});

// ============================================
// DYNAMIC UPDATES
// ============================================

document.title = 'Welcome to the Updated Menu!';
$('.title').element.textContent = 'Welcome to the Updated Menu!';
