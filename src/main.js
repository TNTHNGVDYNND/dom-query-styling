/**
 * @fileoverview Main Entry Point for DOM-Query Styling project.
 * v2.5 - Error Handling & Production Robustness
 * 
 * @module main
 */

import $, { DOM, $$ } from './dom.js';
import * as styles from './styles.js';
import { applyStyles, toggleClass } from './styles.js';
import { setupButtonHover, setupButtonClick, setupSearchFilter } from './events.js';
import { newMenuItem, pageTitle } from './data.js';
import { config } from './config.js';

// ============================================
// STYLING (Using Config Selectors)
// ============================================

$('body').addClass(...styles.bodyStyles);
$(config.selectors.title).addClass(...styles.titleStyles);
$$(config.selectors.categories).forEach(el => el.classList.add(...styles.categoryStyles));
$(config.selectors.main).addClass(...styles.menuLayoutStyles);
$$(config.selectors.menuCategories).forEach(el => el.classList.add(...styles.menuCategoryStyles));
$$(config.selectors.foodItems).forEach(el => el.classList.add(...styles.foodItemStyles));
$(config.selectors.footer).addClass(...styles.footerStyles);
$(config.selectors.input).addClass(...styles.inputStyles);

// Button
const btnCheck = $(config.selectors.button);
btnCheck.addClass(...styles.buttonStyles);
setupButtonHover(btnCheck);

// Sections
$$(config.selectors.sections).forEach((section, index) => {
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
// v2.1: SEARCH & FILTER
// ============================================

const searchInput = $(config.selectors.input);
setupSearchFilter(searchInput);

// Create "no results" message element
const noResultsMsg = DOM.create('p', 'no-results', 'No items match your search.');
noResultsMsg.classList.add('hidden');
$('main').element.appendChild(noResultsMsg);

// ============================================
// DYNAMIC UPDATES
// ============================================

document.title = pageTitle;
$('.title').element.textContent = pageTitle;

// ============================================
// v2.1: UTILITY DEMONSTRATION
// ============================================

// $$ query shorthand - returns raw NodeList
$$(config.selectors.foodItems).forEach((item, index) => {
    item.textContent = `$$ Item ${index + 1}`;
});

// applyStyles - CSS-in-JS utility
applyStyles($$(config.selectors.sections), { transition: 'transform 0.3s ease' });

// toggleClass - class toggling utility
const footerEl = $(config.selectors.footer).element;
toggleClass(footerEl, 'footer-active');

// ============================================
// v2.2: ENTRANCE ANIMATIONS
// ============================================

// Staggered entrance animation for food items on page load
window.addEventListener('DOMContentLoaded', () => {
    const foodItems = $$(config.selectors.foodItems);
    foodItems.stagger(config.animations.staggerDuration, config.animations.staggerOffset);
    
    // Slide in sections with delay
    $$(config.selectors.sections).forEach((section, index) => {
        setTimeout(() => {
            $(section).slideIn(config.animations.slideIn);
        }, index * 150);
    });
});

// ============================================
// v2.3: ACCESSIBILITY - KEYBOARD NAVIGATION
// ============================================

// Ensure food items are keyboard accessible
$$(config.selectors.foodItems).forEach(item => {
    item.setAttribute('tabindex', '0');
    
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
});
