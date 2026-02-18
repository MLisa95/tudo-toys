import { loadStats } from "./api.mjs";
// library script
import { getToys, showToys } from "./ToyDetails.mjs";
import { buildSkills , buildCategories } from "./Catalog.mjs";

window.addEventListener('DOMContentLoaded', async () => {
    // api stats
    loadStats();

    // get toys from ToyDetails
    const toys = await getToys();

    // show toys in container
    showToys(toys, ".toyContainer");

    // build filter dropdowns
    buildCategories(toys);
    buildSkills(toys);

    const skillSelect = document.getElementById("skillFilter");
    const categorySelect = document.getElementById("categoryFilter");

    categorySelect.addEventListener("change", () => {
        const selectedCategory = categorySelect.value;
        if (selectedCategory === "all") {
            showToys(toys, ".toyContainer");
        } else {
            const filteredToys = toys.filter(toy => toy.category === selectedCategory);
            showToys(filteredToys, ".toyContainer");
        }
    });

    skillSelect.addEventListener("change", () => {
        const selectedSkill = skillSelect.value;

        if (selectedSkill === "all") {
            showToys(toys, ".toyContainer");
        } else {
            const filteredToys = toys.filter(toy =>
                toy.skills.includes(selectedSkill)
            );
            showToys(filteredToys, ".toyContainer");
        }
    });
});