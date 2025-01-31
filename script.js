import { categories, alphabetLetters } from "./words.js";
import { drawBody, drawHead, drawInitialStructure, drawLeftArm, drawLeftLeg, drawRightArm, drawRightLeg } from "./canvas.js"; 
import {blastConfetti} from "./confetti.js";

let chosenWord = "";
let lettersGuessed = 0;
let incorrectGuessesCount = 0;

const categoryContainer = document.getElementById("category-container");
const alphabetContainer = document.querySelector(".alphabet-container");
const newGamePopup = document.querySelector(".new-game-popup");
const newGameButton = document.querySelector("#new-game-button");
// after html and css elements are loaded, we use this 
document.addEventListener("DOMContentLoaded", () => {
    displayCategories();
    createAlphabetButtons();
    drawInitialStructure();
    newGameButton.addEventListener("click", newGame);
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
        button.addEventListener("click", selectLetter);
        alphabetContainer.appendChild(button);
    });
};

const selectLetter = (e) => {
    const selectedLetter = e.target.textContent;
    const chosenWordArray = chosenWord.split("");

    if(chosenWordArray.includes(selectedLetter))
    {
        revealLetters(chosenWordArray, selectedLetter);

        if(chosenWordArray.length === lettersGuessed){
            displayResult(true);
        }
    } else{
        incorrectGuessesCount++;
        drawMan();
        if(incorrectGuessesCount === 6){
            displayResult(false);
        }
    }
    e.target.disabled = true;
};


const revealLetters = (chosenWordArray, selectedLetter) => {
    const dashes = document.querySelectorAll(".dashes");
    chosenWordArray.forEach((letter, index) => {
        if(letter === selectedLetter){
            dashes[index].textContent = letter;
            lettersGuessed++;
        }
    });
};

const drawMan = () =>{
    const drawFunctions = [
        drawHead, 
        drawBody, 
        drawLeftArm, 
        drawRightArm, 
        drawLeftLeg,
        drawRightLeg,
    ];
    if(incorrectGuessesCount <= drawFunctions.length){
        drawFunctions[incorrectGuessesCount - 1]();
    }
};

const displayResult = (isWin) =>{
    const h2 = document.querySelector("#results-container h2");
    h2.textContent = isWin ? "You won" : "You lost";

    const p = document.querySelector("#results-container p");
    if(!isWin){
        p.textContent = `The chosen word was ${chosenWord}`;
    }
    setTimeout(() => {
        newGamePopup.classList.add("active")
        if(isWin){
            blastConfetti();
        }
    }, 500);
};


const newGame = () =>{
    const hiddenWord = document.querySelector("#hidden-word");
    incorrectGuessesCount = 0;
    lettersGuessed = 0;
    chosenWord = "";

    newGamePopup.classList.remove("active");
    alphabetContainer.classList.remove("active");
    hiddenWord.classList.remove("active");
    hiddenWord.textContent = "";

    alphabetContainer.innerHTML = "";
    categoryContainer.innerHTML = ""; 

    displayCategories();
    createAlphabetButtons();
    drawInitialStructure();
}