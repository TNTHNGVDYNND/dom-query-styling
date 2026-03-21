/**
 * @fileoverview Dynamic Data and Configuration for DOM-Query Styling project.
 * Contains menu item templates and content data.
 * 
 * @module data
 */

/**
 * @typedef {Object} MenuItem
 * @property {string} tag - HTML tag name
 * @property {string[]} classes - CSS class names
 * @property {string} text - Text content
 * @property {string} parentSelector - Selector for parent element
 */

/**
 * Template for dynamically adding a new menu item.
 * @type {MenuItem}
 */
export const newMenuItem = {
    tag: 'li',
    classes: ['food-item'],
    text: 'Item-4',
    parentSelector: '.menu-category'
};

/**
 * Page title displayed in browser tab and header.
 * @type {string}
 */
export const pageTitle = 'Welcome to the Updated Menu!';

/**
 * Section color class mappings.
 * @type {Object.<string, string>}
 */
export const sectionColors = {
    starters: 'section-starters',
    mains: 'section-mains',
    desserts: 'section-desserts'
};
