// FUNCTION: filtering logic, browsing by category, and skills, building dropdowns for filters

// finding all skills in toys.json for filter dropdown
function getAllSkills(toys) {
    const skillsSet = new Set(); // Set() stores unique values only, no duplicates
    toys.forEach(toy => {
        toy.skills.forEach(skill => skillsSet.add(skill));
    });
    return Array.from(skillsSet).sort();
}

function getAllCategories(toys) {
  const categorySet = new Set();

  toys.forEach(toy => {
    if (toy.category) {
      categorySet.add(toy.category);
    }
  });
  return Array.from(categorySet).sort();
}

// building categories
export function buildCategories(toys) {
  const categories = getAllCategories(toys);
  const categorySelect = document.getElementById("categoryFilter"); 

  // default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = "All Categories";
  categorySelect.appendChild(defaultOption);
  
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1); // capitalize first letter
    categorySelect.appendChild(option);
  });
}

// building skills
export function buildSkills(toys) {
  const skills = getAllSkills(toys);
  const skillSelect = document.getElementById("skillFilter");

  // default option = skills
  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = "All Skills";
  skillSelect.appendChild(defaultOption);

  skills.forEach(skill => {
    const option = document.createElement("option");
    option.value = skill;
    option.textContent = skill.charAt(0).toUpperCase() + skill.slice(1); // capitalize first letter
    skillSelect.appendChild(option);
  });
}