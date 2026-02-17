// CENTRAL SOURCE OF TRUTH, prevents duplicate fetch logic
// keeps data access consistent

// WHAT TOYS EXIST AND HOW SHOULD I SHOW THEM?

import { getLocalStorage, setLocalStorage } from "./utilis.mjs";

const BASKET_KEY = "tudo-basket";

// 1. fetch toys from .json
export async function getToys() {
    const response = await fetch("./data/toys.json");
    const toys = await response.json();
    return toys;
}

// 2. put toys in container (possibilities: DETAIL PAGE and BASKET/CART = REUSABLE
export async function showToys(containerSelector) {
    const container = document.querySelector(containerSelector);
    const toys = await getToys();

    // clear container each time for new
    container.innerHTML = "";

    // loop through toys and create HTML
    toys.forEach((toy) => {
        // create card container
        const toyCard = document.createElement("div");
        toyCard.classList.add("toy-card");
        toyCard.innerHTML = `
        <img src="${toy.image}" alt="${toy.name}">
        <h3>${toy.name}</h3>
        <p>${toy.description}</p>
        <p><strong>Skills:</strong> ${toy.skills.join(", ")}</p>
        <p>Price: R${toy.listPrice.toFixed(2)}</p>
        <button data-id="${toy.id}">Add to Basket</button>
        `;

        // click event
        const button = toyCard.querySelector("button");
        button.addEventListener("click", () => addToBasket(toy));

        container.appendChild(toyCard);
    });
}

export function addToBasket(toy) {
    const basket = getLocalStorage(BASKET_KEY);
    basket.push(toy); // add selected toy to array
    setLocalStorage(BASKET_KEY, basket);
}
