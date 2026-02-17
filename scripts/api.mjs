import { getJSON } from "./utilis.mjs";

// loading stats on about-us.html
export async function loadStats() {
    const stats = await getJSON("data/stats.json");
    if (!stats) return;

    animateCounter('toys', stats.toysBorrowed);
    animateCounter('users', stats.partnerSchools);
    animateCounter('parents', stats.partnerParents);
    animateCounter('stock', stats.toysInStock);

}

function animateCounter(id, target) {
    const element = document.getElementById(id);

    if (!element) return;

    let count = 0;
    const frames = 50;
    const increment = Math.ceil(target / frames);

    // add class for CSS animation
    element.classList.add('animate-count');

    function updateCounter() {
        count += increment;
        if (count < target) {
            element.textContent = count.toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();

            // remove animation class after counting is done
            element.style.transform = 'scale(1)';
            // element.classList.remove('animate-count');
        }
    }

    updateCounter();
}


