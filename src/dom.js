/**
 * @fileoverview DOM Utility Class for DOM-Query Styling project.
 * Provides a fluent API for DOM manipulation with method chaining.
 * Includes enhanced error handling for production robustness.
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
 * Enhanced with error handling and graceful degradation.
 * @class
 */
export class DOM {
    /**
     * Creates a new DOM instance and queries the DOM.
     * @param {string} selector - CSS selector for querySelector
     */
    constructor(selector) {
        if (typeof selector !== 'string') {
            debug(`Invalid selector type: expected string, got ${typeof selector}`);
            this.element = null;
            this.elements = [];
            return;
        }
        
        this.element = document.querySelector(selector);
        this.elements = document.querySelectorAll(selector);
        
        if (!this.element && config.app.debug) {
            debug(`No element found for selector: ${selector}`);
        }
    }
    
    /**
     * Checks if the DOM instance has a valid element.
     * @returns {boolean} True if element exists
     */
    exists() {
        return this.element !== null;
    }
    
    /**
     * Gets the element or throws a helpful error.
     * @returns {Element} The DOM element
     * @throws {Error} If element is null
     */
    getOrThrow() {
        if (!this.element) {
            throw new Error('DOM: Cannot get element - selector returned null');
        }
        return this.element;
    }

    /**
     * Adds CSS classes to the selected element.
     * @param {...string} classNames - Class names to add
     * @returns {DOM} Returns this for method chaining
     */
    addClass(...classNames) {
        if (!this.element) {
            debug(`Cannot add class: no element selected`);
            return this;
        }
        if (classNames.length === 0) {
            debug(`Cannot add class: no class names provided`);
            return this;
        }
        try {
            this.element.classList.add(...classNames);
        } catch (e) {
            debug(`Error adding class: ${e.message}`);
        }
        return this;
    }

    /**
     * Adds CSS classes to all selected elements.
     * @param {...string} classNames - Class names to add
     * @returns {DOM} Returns this for method chaining
     */
    addClassAll(...classNames) {
        if (this.elements.length === 0) {
            debug(`Cannot add class: no elements found`);
            return this;
        }
        if (classNames.length === 0) {
            debug(`Cannot add class: no class names provided`);
            return this;
        }
        try {
            this.elements.forEach(el => el.classList.add(...classNames));
        } catch (e) {
            debug(`Error adding class: ${e.message}`);
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
        if (!this.element) {
            debug(`Cannot apply CSS: no element selected`);
            return this;
        }
        if (!styles || typeof styles !== 'object') {
            debug(`Cannot apply CSS: invalid styles object`);
            return this;
        }
        try {
            Object.assign(this.element.style, styles);
        } catch (e) {
            debug(`Error applying CSS: ${e.message}`);
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
        if (!this.element) {
            debug(`Cannot attach event '${event}': no element selected`);
            return this;
        }
        if (!event || typeof event !== 'string') {
            debug(`Cannot attach event: invalid event type`);
            return this;
        }
        if (typeof handler !== 'function') {
            debug(`Cannot attach event '${event}': handler is not a function`);
            return this;
        }
        try {
            this.element.addEventListener(event, handler);
        } catch (e) {
            debug(`Error attaching event '${event}': ${e.message}`);
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
        if (this.elements.length === 0) {
            debug(`Cannot attach event '${event}': no elements found`);
            return this;
        }
        if (!event || typeof event !== 'string') {
            debug(`Cannot attach event: invalid event type`);
            return this;
        }
        if (typeof handler !== 'function') {
            debug(`Cannot attach event '${event}': handler is not a function`);
            return this;
        }
        try {
            this.elements.forEach(el => el.addEventListener(event, handler));
        } catch (e) {
            debug(`Error attaching event '${event}': ${e.message}`);
        }
        return this;
    }

    /**
     * Appends a child element to the selected element.
     * @param {Element} child - DOM element to append
     * @returns {DOM} Returns this for method chaining
     */
    append(child) {
        if (!this.element) {
            debug(`Cannot append: no parent element selected`);
            return this;
        }
        if (!child || !(child instanceof Element)) {
            debug(`Cannot append: invalid child element`);
            return this;
        }
        try {
            this.element.appendChild(child);
        } catch (e) {
            debug(`Error appending element: ${e.message}`);
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

    /**
     * Fades in the selected element.
     * @param {number} [duration=300] - Duration in milliseconds
     * @returns {DOM} Returns this for method chaining
     */
    fadeIn(duration = 300) {
        if (this.element) {
            this.element.style.opacity = 0;
            this.element.style.display = 'block';
            let start = null;
            const animate = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                this.element.style.opacity = progress;
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }
        return this;
    }

    /**
     * Fades out the selected element.
     * @param {number} [duration=300] - Duration in milliseconds
     * @returns {DOM} Returns this for method chaining
     */
    fadeOut(duration = 300) {
        if (this.element) {
            let start = null;
            const animate = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                this.element.style.opacity = 1 - progress;
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    this.element.style.display = 'none';
                }
            };
            requestAnimationFrame(animate);
        }
        return this;
    }

    /**
     * Slides in the selected element from the left.
     * @param {number} [duration=300] - Duration in milliseconds
     * @returns {DOM} Returns this for method chaining
     */
    slideIn(duration = 300) {
        if (this.element) {
            this.element.style.opacity = 0;
            this.element.style.transform = 'translateX(-50px)';
            this.element.style.display = 'block';
            let start = null;
            const animate = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                this.element.style.opacity = eased;
                this.element.style.transform = `translateX(${-50 * (1 - eased)}px)`;
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }
        return this;
    }

    /**
     * Delays execution of the next method in chain.
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise} Promise that resolves after delay
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Applies staggered animation to multiple elements.
     * @param {number} [duration=300] - Duration per item in milliseconds
     * @param {number} [offset=50] - Delay offset between items in milliseconds
     * @returns {DOM} Returns this for method chaining
     */
    stagger(duration = 300, offset = 50) {
        if (this.elements.length > 0) {
            this.elements.forEach((el, index) => {
                el.style.opacity = 0;
                el.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    let start = null;
                    const animate = (timestamp) => {
                        if (!start) start = timestamp;
                        const progress = Math.min((timestamp - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.style.opacity = eased;
                        el.style.transform = `translateY(${20 * (1 - eased)}px)`;
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };
                    requestAnimationFrame(animate);
                }, index * offset);
            });
        }
        return this;
    }
}

/**
 * Query selector shorthand returning a DOM instance.
 * @param {string} selector - CSS selector
 * @returns {DOM} DOM instance with chainable methods
 */
export const $ = (selector) => new DOM(selector);

/**
 * Query selector all shorthand returning NodeList with animation support.
 * For direct iteration and animation without DOM class wrapping.
 * @param {string} selector - CSS selector
 * @returns {NodeList & {stagger: Function}} NodeList with extra methods
 * @example $$('.item').forEach(el => console.log(el))
 * @example $$('.item').stagger(300, 50)
 */
export const $$ = (selector) => {
    const nodeList = document.querySelectorAll(selector);
    
    nodeList.stagger = (duration = 300, offset = 50) => {
        nodeList.forEach((el, index) => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(20px)';
            setTimeout(() => {
                let start = null;
                const animate = (timestamp) => {
                    if (!start) start = timestamp;
                    const progress = Math.min((timestamp - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.style.opacity = eased;
                    el.style.transform = `translateY(${20 * (1 - eased)}px)`;
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                requestAnimationFrame(animate);
            }, index * offset);
        });
        return nodeList;
    };
    
    return nodeList;
};

export default $;
