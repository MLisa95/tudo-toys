// IMPORTING HELPER FUNCTIONS (localStorage)
// basket.js says give me cart data, or save cart data

import { getLocalStorage, setLocalStorage } from "./utilis.mjs";

// name under which this project stores cart data
const BASKET_KEY = "tudo-basket";

// RENDERING DATA = "how do i turn data into sometthing the user can see?"
function renderBasket() {
    // reads current basket from localStorage 
    const basket = getLocalStorage(BASKET_KEY);

    const container = document.querySelector(".basket-list");

    // clear previous content
    container.innerHTML = "";

    // if basket is empty

    if (basket.length === 0) {
        container.innerHTML = "<p>Your basket is empty 🧺</p>";
        return;
    }

    basket.forEach((toy, index) => {
        const li = document.createElement("li");
        li.classList.add("basket-card");
        li.innerHTML = `
        <img src="${toy.image}" alt="${toy.name}">
        <div class="toy-details">
            <h3>${toy.name}</h3>
            <p>${toy.listPrice}</p>
        </div>
        <!-- NOTICE THE 'data' ATTRIBUTE = adds data to the button element -->
        <button class="remove-toy" data-index="${index}">Remove</button>
        `

        container.appendChild(li);

    });

    // the remove buttons are created DYNAMICALLY by the renderBasket() function
    // JS can only attach even listeners to elements that already exist
    const removeButton = document.querySelectorAll(".remove-toy"); // find ALL .remove-toy elements
    removeButton.forEach((button) => {
        button.addEventListener("click", () => { // every buttton gets event listener
            removeFromBasket(button.dataset.index);
        });
    });
}

function removeFromBasket(index) {
    const basket = getLocalStorage(BASKET_KEY);
    basket.splice(index, 1);
    setLocalStorage(BASKET_KEY, basket)
    renderBasket(); // refresh basket display
}

// SEATBELT TO AVOID BUGS - ENSURE DOM IS FULLY LOADED BEFORE SCRIPT RUNS
// call renderBasket() AFTER DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    renderBasket();
})
