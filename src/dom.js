// v1.5 - ES Modules: DOM Utility Class

export class DOM {
    constructor(selector) {
        this.element = document.querySelector(selector);
        this.elements = document.querySelectorAll(selector);
    }

    addClass(...classNames) {
        if (this.element) this.element.classList.add(...classNames);
        return this;
    }

    addClassAll(...classNames) {
        this.elements.forEach(el => el.classList.add(...classNames));
        return this;
    }

    css(styles) {
        if (this.element) Object.assign(this.element.style, styles);
        return this;
    }

    on(event, handler) {
        if (this.element) this.element.addEventListener(event, handler);
        return this;
    }

    onAll(event, handler) {
        this.elements.forEach(el => el.addEventListener(event, handler));
        return this;
    }

    append(child) {
        if (this.element) this.element.appendChild(child);
        return this;
    }

    static create(tag, classNames = [], text = '') {
        const el = document.createElement(tag);
        const classes = typeof classNames === 'string' ? [classNames] : classNames;
        classes.forEach(cls => el.classList.add(cls));
        el.textContent = text;
        return el;
    }
}

export const $ = (selector) => new DOM(selector);
export default $;
