/**
 * @fileoverview DOM Utility Class for DOM-Query Styling project.
 * Provides a fluent API for DOM manipulation with method chaining.
 * 
 * @module dom
 */

/**
 * @typedef {Object} StyleObject
 * @description Object mapping CSS property names to values
 * @example { backgroundColor: 'red', fontSize: '16px' }
 */

/**
 * @typedef {string | string[]} ClassNames
 * @description Single class name or array of class names
 */

import { config, debug } from './config.js';

/**
 * DOM utility class providing chainable DOM manipulation methods.
 * @class
 */
export class DOM {
    /**
     * Creates a new DOM instance and queries the DOM.
     * @param {string} selector - CSS selector for querySelector
     */
    constructor(selector) {
        this.element = document.querySelector(selector);
        this.elements = document.querySelectorAll(selector);
        
        if (!this.element && config.app.debug) {
            debug(`No element found for selector: ${selector}`);
        }
    }

    /**
     * Adds CSS classes to the selected element.
     * @param {...string} classNames - Class names to add
     * @returns {DOM} Returns this for method chaining
     */
    addClass(...classNames) {
        if (this.element) {
            this.element.classList.add(...classNames);
        } else if (config.app.debug) {
            debug(`Cannot add class: no element selected`);
        }
        return this;
    }

    /**
     * Adds CSS classes to all selected elements.
     * @param {...string} classNames - Class names to add
     * @returns {DOM} Returns this for method chaining
     */
    addClassAll(...classNames) {
        if (this.elements.length > 0) {
            this.elements.forEach(el => el.classList.add(...classNames));
        } else if (config.app.debug) {
            debug(`Cannot add class: no elements found`);
        }
        return this;
    }

    /**
     * Applies inline styles to the selected element.
     * @param {StyleObject} styles - Object with CSS property-value pairs
     * @returns {DOM} Returns this for method chaining
     * @example $.css({ backgroundColor: 'red', color: 'white' })
     */
    css(styles) {
        if (this.element) {
            Object.assign(this.element.style, styles);
        } else if (config.app.debug) {
            debug(`Cannot apply CSS: no element selected`);
        }
        return this;
    }

    /**
     * Attaches an event listener to the selected element.
     * @param {string} event - Event type (e.g., 'click', 'mouseenter')
     * @param {Function} handler - Event handler function
     * @returns {DOM} Returns this for method chaining
     * @example $.on('click', () => console.log('clicked'))
     */
    on(event, handler) {
        if (this.element) {
            this.element.addEventListener(event, handler);
        } else if (config.app.debug) {
            debug(`Cannot attach event '${event}': no element selected`);
        }
        return this;
    }

    /**
     * Attaches an event listener to all selected elements.
     * @param {string} event - Event type
     * @param {Function} handler - Event handler function
     * @returns {DOM} Returns this for method chaining
     */
    onAll(event, handler) {
        if (this.elements.length > 0) {
            this.elements.forEach(el => el.addEventListener(event, handler));
        } else if (config.app.debug) {
            debug(`Cannot attach event '${event}': no elements found`);
        }
        return this;
    }

    /**
     * Appends a child element to the selected element.
     * @param {Element} child - DOM element to append
     * @returns {DOM} Returns this for method chaining
     */
    append(child) {
        if (this.element && child instanceof Element) {
            this.element.appendChild(child);
        } else if (config.app.debug) {
            debug(`Cannot append: invalid element or no parent selected`);
        }
        return this;
    }

    /**
     * Creates a new DOM element with optional classes and text.
     * @param {string} tag - HTML tag name (e.g., 'div', 'li')
     * @param {ClassNames} [classNames] - Optional class name(s)
     * @param {string} [text=''] - Optional text content
     * @returns {Element} The created DOM element
     * @example DOM.create('div', 'container', 'Hello World')
     */
    static create(tag, classNames = [], text = '') {
        const el = document.createElement(tag);
        const classes = typeof classNames === 'string' ? [classNames] : classNames;
        classes.forEach(cls => el.classList.add(cls));
        el.textContent = text;
        return el;
    }
}

/**
 * Query selector shorthand returning a DOM instance.
 * @param {string} selector - CSS selector
 * @returns {DOM} DOM instance with chainable methods
 */
export const $ = (selector) => new DOM(selector);

/**
 * Query selector all shorthand returning raw NodeList.
 * For direct iteration without DOM class wrapping.
 * @param {string} selector - CSS selector
 * @returns {NodeList} NodeList of matched elements
 * @example $$('.item').forEach(el => console.log(el))
 */
export const $$ = (selector) => document.querySelectorAll(selector);

export default $;
