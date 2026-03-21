/**
 * @fileoverview Event Handlers for DOM-Query Styling project.
 * Provides reusable event setup functions with input validation.
 * 
 * @module events
 */

import { $ } from './dom.js';
import { colors } from './styles.js';
import { config, debug } from './config.js';

/**
 * Validates search input value.
 * @param {string} value - Input value to validate
 * @returns {{valid: boolean, error: string|null}} Validation result
 */
const validateSearchInput = (value) => {
    if (!value) {
        return { valid: true, error: null };
    }
    
    if (value.length > config.validation.inputMaxLength) {
        return { 
            valid: false, 
            error: `Search text too long (max ${config.validation.inputMaxLength} characters)` 
        };
    }
    
    return { valid: true, error: null };
};

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
        if (!input) {
            debug(`Button click: input element not found`);
            return;
        }
        if (!input.value.trim()) {
            debug(`Button click: input is empty`);
            return;
        }
        alert(`Your number: ${input.value}`);
        input.value = '';
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

/**
 * Sets up real-time search filtering for food items.
 * Filters menu items based on input text and shows "no results" message.
 * Includes input validation and error handling.
 * @param {DOM} input - DOM instance of the search input
 * @param {string} [itemSelector='.food-item'] - Selector for items to filter
 * @returns {void}
 * @example setupSearchFilter($('#search-input'))
 */
export const setupSearchFilter = (input, itemSelector = '.food-item') => {
    if (!input || !input.element) {
        debug(`setupSearchFilter: invalid input DOM instance`);
        return;
    }
    
    input.on('input', () => {
        const rawValue = input.element.value;
        const validation = validateSearchInput(rawValue);
        
        if (!validation.valid) {
            input.element.classList.add('invalid-input');
            debug(validation.error);
            return;
        }
        
        input.element.classList.remove('invalid-input');
        
        const searchTerm = rawValue.toLowerCase().trim();
        const items = document.querySelectorAll(itemSelector);
        
        if (items.length === 0) {
            debug(`No items found with selector: ${itemSelector}`);
            return;
        }
        
        let matchCount = 0;

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            const matches = text.includes(searchTerm);

            if (matches) {
                item.classList.remove('hidden');
                item.classList.add(config.search.highlightClass);
                matchCount++;
            } else {
                item.classList.add('hidden');
                item.classList.remove(config.search.highlightClass);
            }
        });

        const noResultsEl = document.querySelector(config.selectors.noResults);
        if (noResultsEl) {
            if (matchCount === 0 && searchTerm.length > 0) {
                // Use visibility toggle instead of display to prevent CLS
                noResultsEl.classList.remove('hidden');
                noResultsEl.style.visibility = 'visible';
                noResultsEl.style.opacity = '1';
                noResultsEl.style.height = 'auto';
            } else {
                noResultsEl.classList.add('hidden');
                noResultsEl.style.visibility = 'hidden';
                noResultsEl.style.opacity = '0';
                noResultsEl.style.height = '0';
            }
        }
    });
};
