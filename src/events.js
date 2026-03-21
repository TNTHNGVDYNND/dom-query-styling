/**
 * @fileoverview Event Handlers for DOM-Query Styling project.
 * Provides reusable event setup functions.
 * 
 * @module events
 */

import { $ } from './dom.js';
import { colors } from './styles.js';

/**
 * Sets up hover effects on a button element.
 * Changes background color on mouse enter/leave.
 * @param {DOM} btn - DOM instance of the button
 * @returns {void}
 * @example setupButtonHover($('.btn-check'))
 */
export const setupButtonHover = (btn) => {
    btn.on('mouseenter', () => btn.css({ backgroundColor: colors.hover }));
    btn.on('mouseleave', () => btn.css({ backgroundColor: colors.primary }));
};

/**
 * Sets up click handler on a button to display input value.
 * @param {DOM} btn - DOM instance of the button
 * @param {string} [inputSelector='.guess'] - Selector for input element
 * @returns {void}
 * @example setupButtonClick($('.btn-check'))
 */
export const setupButtonClick = (btn, inputSelector = '.guess') => {
    btn.on('click', () => {
        const input = $(inputSelector).element;
        if (input) {
            alert(`Your number: ${input.value}`);
            input.value = '';
        }
    });
};

/**
 * Sets up hover effects on a food item.
 * Changes text color on hover.
 * @param {DOM} item - DOM instance of the food item
 * @returns {void}
 * @example setupFoodItemHover($('.food-item'))
 */
export const setupFoodItemHover = (item) => {
    item.on('mouseenter', () => item.css({ color: colors.primary }));
    item.on('mouseleave', () => {
        item.css({ color: 'black', backgroundColor: 'transparent' });
    });
};
