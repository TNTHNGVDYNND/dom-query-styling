// v1.6 - Query & Style Enhancements: Main Entry Point

import $, { DOM, $$ } from './dom.js';
import * as styles from './styles.js';
import { applyStyles, toggleClass } from './styles.js';
import { setupButtonHover, setupButtonClick } from './events.js';
import { newMenuItem, pageTitle, sectionColors } from './data.js';

// ============================================
// STYLING
// ============================================

$('body').addClass(...styles.bodyStyles);
$('h1').addClass(...styles.titleStyles);
$('.category').addClassAll(...styles.categoryStyles);
$('main').addClass(...styles.menuLayoutStyles);
$('.menu-category').addClassAll(...styles.menuCategoryStyles);
$('.food-item').addClassAll(...styles.foodItemStyles);
$('footer').addClass(...styles.footerStyles);
$('.guess').addClass(...styles.inputStyles);

// Button
const btnCheck = $('.btn-check');
btnCheck.addClass(...styles.buttonStyles);
setupButtonHover(btnCheck);

// Sections
$('section').elements.forEach((section, index) => {
    section.classList.add(styles.sectionStyles.padded);
    if (index === 0) section.classList.add(styles.sectionStyles.starters);
    if (index === 1) section.classList.add(styles.sectionStyles.mains);
    if (index === 2) section.classList.add(styles.sectionStyles.desserts);
});

// ============================================
// DYNAMIC CONTENT
// ============================================

$(newMenuItem.parentSelector).append(
    DOM.create(newMenuItem.tag, newMenuItem.classes, newMenuItem.text)
);

// ============================================
// EVENT HANDLERS
// ============================================

setupButtonClick(btnCheck);

// ============================================
// DYNAMIC UPDATES
// ============================================

document.title = pageTitle;
$('.title').element.textContent = pageTitle;

// ============================================
// v1.6: DEMONSTRATE NEW UTILITIES
// ============================================

// $$ query shorthand - returns raw NodeList
$$('.food-item').forEach((item, index) => {
    item.textContent = `$$ Item ${index + 1}`;
});

// applyStyles - CSS-in-JS utility
applyStyles($$('section'), { transition: 'transform 0.3s ease' });

// toggleClass - class toggling utility
const footerEl = $('footer').element;
toggleClass(footerEl, 'footer-active');
