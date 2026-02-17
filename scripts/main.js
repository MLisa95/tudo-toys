import { loadStats } from "./api.mjs";

window.addEventListener('DOMContentLoaded', () => {
    loadStats();
});

// library script
import { showToys } from "./ToyDetails.mjs";

document.addEventListener("DOMContentLoaded", () => {
    showToys(".toyContainer");
});