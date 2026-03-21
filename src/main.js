// v1.5 - ES Modules: Main Entry Point

import $, { DOM } from './dom.js';
import * as styles from './styles.js';
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
