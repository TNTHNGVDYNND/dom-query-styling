// * Selecting elements from the DOM and styling them

document.body.style.fontFamily = "Roboto, sans-serif";
document.querySelector("h1").style.textAlign = "center";
document.querySelector("h1").style.textTransform = "uppercase";
document.querySelector("h1").style.fontWeight = "650";

const category = document.querySelectorAll(".category");
category.forEach((category) => {
  category.style.fontStyle = "italic";
  category.style.fontSize = "2rem";
  category.style.borderBottom = "1px solid black";
});

const main = document.querySelector("main");
main.style.display = "flex";
main.style.flexFlow = "row wrap";
main.style.justifyContent = "space-around";
main.style.boxSizing = "border-box";

const foodItem = document.querySelectorAll(".food-item");
foodItem.forEach((item) => {
  item.style.marginTop = "1rem";
  item.style.listStyleType = "none";

  // TVATDCI
  // Let's have some Hover effects
  item.style.transition = "all 0.3s ease-in-out";
  item.addEventListener("mouseenter", () => {
    item.style.color = "white";
    item.style.backgroundColor = "#333";
    item.style.cursor = "pointer";
  });
  item.addEventListener("mouseleave", () => {
    item.style.color = "black";
    item.style.backgroundColor = "transparent";
  });
});

const menuCat = document.querySelectorAll(".menu-category");
menuCat.forEach((category) => {
  category.style.minWidth = "300px";
  category.style.height = "10rem";
  category.style.borderRadius = "5px";
  category.style.border = "1px solid black";
});

const footer = document.querySelector("footer");
footer.style.float = "right";
footer.style.marginTop = "10px";
// TVATDCI
// Adding new items dynamically
const startersList = document.querySelector(".menu-category"); // Select first menu category (Starters)
const newItem = document.createElement("li"); // Create a new list item
newItem.textContent = "Item-4"; // Set text content
newItem.classList.add("food-item"); // Add the existing class for consistent styling
startersList.appendChild(newItem); // Add new item to the list
// TVATDCI
// Changing the background color of sections
const sections = document.querySelectorAll("section");
const colors = ["#ffb6c1", "#98fb98", "#add8e6"]; // Light pink, light green, light blue

sections.forEach((section, index) => {
  section.style.backgroundColor = colors[index]; // Apply colors from array
  section.style.padding = "20px"; // Add padding for spacing
  section.style.borderRadius = "10px"; // Round the corners
});
// TVATDCI
// Handling button clicks
const btnCheck = document.querySelector(".btn-check");
const inputGuess = document.querySelector(".guess");

// Add styling to the button
btnCheck.style.backgroundColor = "#FF0000";
btnCheck.style.color = "#FFFFFF";
btnCheck.style.padding = "10px 20px";
btnCheck.style.border = "none";
btnCheck.style.borderRadius = "5px";
btnCheck.style.cursor = "pointer";

btnCheck.addEventListener("click", () => {
  alert(`Your number: ${inputGuess.value}`); // Display entered number in alert
  inputGuess.value = ""; // Clear input after showing alert
});
// TVATDCI
// Updating the title dynamically
document.title = "Welcome to the Updated Menu!";
document.querySelector(".title").textContent = "Welcome to the Updated Menu!";
