// v1.6 - Query & Style Enhancements: CSS Class Mappings

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

export const applyStyles = (elements, styleObject) => {
    elements.forEach(el => Object.assign(el.style, styleObject));
    return elements;
};

export const toggleClass = (element, className) => {
    element.classList.toggle(className);
    return element;
};
