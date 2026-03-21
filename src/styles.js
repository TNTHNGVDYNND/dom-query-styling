/**
 * @fileoverview CSS Class Mappings and Style Utilities for DOM-Query Styling.
 * Provides centralized style definitions and utility functions.
 * 
 * @module styles
 */

/**
 * @typedef {string[]} StyleArray
 * @description Array of CSS class names
 */

/**
 * @typedef {Object.<string, string>} StyleObject
 * @description Object mapping CSS properties to values
 */

// CSS Class Mappings
export const bodyStyles = ['body-dark'];
export const titleStyles = ['title-hero'];
export const categoryStyles = ['category-title'];
export const menuLayoutStyles = ['menu-layout'];
export const foodItemStyles = ['food-item'];
export const menuCategoryStyles = ['menu-category-card'];
export const footerStyles = ['footer-card'];
export const buttonStyles = ['btn-primary'];
export const inputStyles = ['input-styled'];

export const sectionStyles = {
    padded: 'section-padded',
    starters: 'section-starters',
    mains: 'section-mains',
    desserts: 'section-desserts'
};

export const colors = {
    primary: '#DC2743',
    hover: '#FF0000'
};

/**
 * Applies inline styles to a collection of elements.
 * @param {NodeList|Element[]} elements - Collection of DOM elements
 * @param {StyleObject} styleObject - CSS property-value pairs
 * @returns {NodeList|Element[]} Returns the elements for chaining
 * @example applyStyles($$('.item'), { backgroundColor: 'red' })
 */
export const applyStyles = (elements, styleObject) => {
    elements.forEach(el => Object.assign(el.style, styleObject));
    return elements;
};

/**
 * Toggles a CSS class on an element.
 * @param {Element} element - DOM element
 * @param {string} className - Class name to toggle
 * @returns {Element} Returns the element for chaining
 */
export const toggleClass = (element, className) => {
    if (element && element.classList) {
        element.classList.toggle(className);
    }
    return element;
};
