/**
 * @fileoverview Centralized configuration for the DOM-Query Styling project.
 * Contains all selectors, event names, and app settings in one place.
 * 
 * @module config
 */

/**
 * Application configuration settings
 * @typedef {Object} AppConfig
 * @property {string} title - Page title
 * @property {boolean} debug - Enable debug mode for console warnings
 */

/**
 * CSS class mappings for consistent styling across the application
 * @typedef {Object} ClassConfig
 */

/**
 * Event configuration
 * @typedef {Object} EventConfig
 */

/**
 * Main configuration object
 * @type {Object}
 */
export const config = {
    app: {
        title: 'The Menu',
        debug: false
    },
    selectors: {
        body: 'body',
        title: 'h1',
        main: 'main',
        sections: 'section',
        footer: 'footer',
        foodItems: '.food-item',
        categories: '.category',
        menuCategories: '.menu-category',
        button: '.btn-check',
        input: '.guess'
    },
    events: {
        button: ['mouseenter', 'mouseleave', 'click'],
        foodItem: ['mouseenter', 'mouseleave']
    }
};

/**
 * Logs a debug message if debug mode is enabled
 * @param {string} message - Message to log
 * @returns {void}
 */
export const debug = (message) => {
    if (config.app.debug) {
        console.warn(`[DEBUG] ${message}`);
    }
};
