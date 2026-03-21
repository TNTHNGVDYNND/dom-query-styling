// v1.5 - ES Modules: Event Handlers

import { $ } from './dom.js';
import { colors } from './styles.js';

export const setupButtonHover = (btn) => {
    btn.on('mouseenter', () => btn.css({ backgroundColor: colors.hover }));
    btn.on('mouseleave', () => btn.css({ backgroundColor: colors.primary }));
};

export const setupButtonClick = (btn, inputSelector = '.guess') => {
    btn.on('click', () => {
        const input = $(inputSelector).element;
        alert(`Your number: ${input.value}`);
        input.value = '';
    });
};

export const setupFoodItemHover = (item) => {
    item.on('mouseenter', () => item.css({ color: colors.primary }));
    item.on('mouseleave', () => {
        item.css({ color: 'black', backgroundColor: 'transparent' });
    });
};
