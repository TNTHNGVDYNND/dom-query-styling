// v1.2 - CSS Classes Refactor

// Body styling
document.body.classList.add('body-dark');

// Title styling
document.querySelector('h1').classList.add('title-hero');

// Category titles
document.querySelectorAll('.category').forEach(el => el.classList.add('category-title'));

// Main layout
document.querySelector('main').classList.add('menu-layout');

// Food items
document.querySelectorAll('.food-item').forEach(item => {
    item.classList.add('food-item');
});

// Menu category cards
document.querySelectorAll('.menu-category').forEach(el => el.classList.add('menu-category-card'));

// Footer
document.querySelector('footer').classList.add('footer-card');

// Button
const btnCheck = document.querySelector('.btn-check');
btnCheck.classList.add('btn-primary');
// Keep JS hover (JS + CSS fallback)
btnCheck.addEventListener('mouseenter', () => {
    btnCheck.style.backgroundColor = '#FF0000';
});
btnCheck.addEventListener('mouseleave', () => {
    btnCheck.style.backgroundColor = '#DC2743';
});

// Input field
document.querySelector('.guess').classList.add('input-styled');

// Sections - hardcoded CSS classes
document.querySelectorAll('section').forEach((section, index) => {
    section.classList.add('section-padded');
    if (index === 0) section.classList.add('section-starters');
    if (index === 1) section.classList.add('section-mains');
    if (index === 2) section.classList.add('section-desserts');
});

// Dynamic content - Adding new item to Starters
const startersList = document.querySelector('.menu-category');
const newItem = document.createElement('li');
newItem.textContent = 'Item-4';
newItem.classList.add('food-item');
startersList.appendChild(newItem);

// Button click handler
btnCheck.addEventListener('click', () => {
    const inputGuess = document.querySelector('.guess');
    alert(`Your number: ${inputGuess.value}`);
    inputGuess.value = '';
});

// Update title dynamically
document.title = 'Welcome to the Updated Menu!';
document.querySelector('.title').textContent = 'Welcome to the Updated Menu!';
