// * Selecting elements from the dom and style them

document.body.style.fontFamily = "Roboto, san-serif"
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
});

const menuCat = document.querySelectorAll(".menu-category");
menuCat.forEach((category) => {
category.style.minWidth = "300px";
category.style.height = "10rem";
category.style.borderRadius = "5px";
category.style.border = "1px solid black";
category.style.border = "1px solid black";
}); 

const footer = document.querySelector("footer")
footer.style.float = "right";
footer.style.marginTop = "10px";
