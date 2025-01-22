import { categories, alphabetLetters } from "./words.js";

let chosenWord = "";

const categoryContainer = document.getElementById("category-container");
const alphabetContainer = document.querySelector(".alphabet-container");
// after html and css elements are loaded, we use this 
document.addEventListener("DOMContentLoaded", () => {
    displayCategories();
    createAlphabetButtons();
});

const displayCategories = () => {
    Object.keys(categories).forEach((category) => {
        const button = document.createElement("button");
        button.className = "category";
        button.textContent = category;
        button.addEventListener("click", () => selectCategory(category));
        categoryContainer.appendChild(button);
    });
}

const selectCategory = (selectedCategory) => {
    document.querySelectorAll(".category").forEach((button) => {
        selectedCategory === button.textContent
            ? button.classList.add("active")
            : (button.disabled = true);
    });
    
    const hiddenWord = document.querySelector("#hidden-word");
    hiddenWord.textContent = "";

    if(!chosenWord){
        const wordArray = categories[selectedCategory];
        const randomIndex = Math.floor(Math.random() * wordArray.length);

        chosenWord = wordArray[randomIndex].toUpperCase();

        hiddenWord.classList.add("active");
        hiddenWord.innerHTML = chosenWord
            .split("")
            .map(() => '<span class="dashes">-</span>')
            .join("");
    }


    alphabetContainer.classList.add("active");
};

const createAlphabetButtons = () => {
    const alphabet = alphabetLetters.split("").forEach((letter)=> {
        const button = document.createElement("button");
        button.className = "button";
        button.textContent = letter;
        alphabetContainer.appendChild(button);
    });
};

