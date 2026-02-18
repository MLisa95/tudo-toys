import { loadStats } from "./api.mjs";
// library script
import { getToys, showToys } from "./ToyDetails.mjs";
import { buildSkills } from "./Catalog.mjs";

window.addEventListener('DOMContentLoaded', async () => {
    // api stats
    loadStats();

    // get toys from ToyDetails
    const toys = await getToys();

    // fetch category from URL when clicked on
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    let filteredToys = toys;
    if (category) {
        filteredToys = toys.filter(toy => toy.category === category);
    }

    // show toys in container
    showToys(filteredToys, ".toyContainer");

    // build filter dropdowns
    buildSkills(toys);

    // filtering logic
    const skillSelect = document.getElementById("skillFilter");
    const categorySelect = document.getElementById("categoryFilter");
    
    categorySelect.addEventListener("change", () => {
        const cat = categorySelect.value;
        const newList = cat === "all" ? toys : toys.filter(toy => toy.category === cat);
        showToys(newList, ".toyContainer");
    });

    skillSelect.addEventListener("change", () => {
        const skill = skillSelect.value;
        const newList = skill === "all" ? toys : toys.filter(toy => toy.skills.includes(skill));
        showToys(newList, ".toyContainer");
    });

});