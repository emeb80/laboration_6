"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Eva Bergström
 */

//hämtar formulär, sökfält och felmeddelande
const form = document.querySelector("#searchform");

const searchInput = document.getElementById("search");

const errorMessage = document.getElementById("error");

const recipe = document.getElementById("recipe");

const message = document.getElementById("message");

//funktion för att visa recept
function displayRecipe(firstRecipe) {
  //variabler för information i receptet
  const servings = firstRecipe.servings;
  const prepTimeMinutes = firstRecipe.prepTimeMinutes;
  const cookTimeMinutes = firstRecipe.cookTimeMinutes;
  const difficulty = firstRecipe.difficulty;
  const ingredients = firstRecipe.ingredients;
  const instructions = firstRecipe.instructions;

  //behållare för recept
  const article = document.createElement("article");
  //lägger till h3 med receptnamn
  const heading = document.createElement("h3");
  heading.textContent = firstRecipe.name;
  article.appendChild(heading);

  //lägger till bilder
  const recipeImage = document.createElement("img");
  recipeImage.src = firstRecipe.image;
  recipeImage.alt = firstRecipe.name;
  article.appendChild(recipeImage);

  //skapar behållare för recept-info
  const recipeInfo = document.createElement("div");
  recipeInfo.className = "recipe-info";

  //lägger till p-element för portioner, förberedelser, tillagningstid, svårighetsgrad
  const servingsP = document.createElement("p");
  servingsP.textContent = "Portioner: " + servings;
  recipeInfo.appendChild(servingsP);

  const prepTimeMinutesP = document.createElement("p");
  prepTimeMinutesP.textContent = "Förberedelser: " + prepTimeMinutes + " min";
  recipeInfo.appendChild(prepTimeMinutesP);

  const cookTimeMinutesP = document.createElement("p");
  cookTimeMinutesP.textContent = "Tillagningstid: " + cookTimeMinutes + " min";
  recipeInfo.appendChild(cookTimeMinutesP);

  const difficultyP = document.createElement("p");
  difficultyP.textContent = "Svårighetsgrad: " + difficulty;
  recipeInfo.appendChild(difficultyP);

  //lägger till behållaren till behållare för recpet
  article.appendChild(recipeInfo);

  //Lägger till osorterad lista för ingredienser
  const ingredientHeading = document.createElement("h4");
  ingredientHeading.textContent = "Ingredienser";
  article.appendChild(ingredientHeading);

  const ingredientsUl = document.createElement("ul");
  for (let i = 0; i < ingredients.length; i++) {
    const ingredientsItem = document.createElement("li");
    ingredientsItem.textContent = ingredients[i];
    ingredientsUl.appendChild(ingredientsItem);
  }
  article.appendChild(ingredientsUl);

  //Lägger till sorterad lista för instruktioner
  const instructionHeading = document.createElement("h4");
  instructionHeading.textContent = "Gör så här";
  article.appendChild(instructionHeading);

  const instructionsOl = document.createElement("ol");
  for (let i = 0; i < instructions.length; i++) {
    const instructionsItem = document.createElement("li");
    instructionsItem.textContent = instructions[i];
    instructionsOl.appendChild(instructionsItem);
  }
  article.appendChild(instructionsOl);
  recipe.appendChild(article);
}

//funktion för att hämta recept från API
async function fetchRecipe(searchTerm) {
  const url = "https://dummyjson.com/recipes/search?q=" + searchTerm;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Fel vid hämtning av recept");
  }

  const data = await response.json();
  const firstRecipe = data.recipes[0];

  return firstRecipe;
}
//funktion för validering
function validateSearchTerm(searchTerm) {
  if (searchTerm === "") {
    errorMessage.textContent = "Fältet måste fyllas i!";
    return false;
  }
  errorMessage.textContent = "";
  return true;
}
//händelsehanterare vid skicka sökning
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  //rensar meddelande knutit till receptsökning
  message.textContent = "";
  const searchTerm = searchInput.value.trim();

  if (!validateSearchTerm(searchTerm)) {
    return;
  }

  let firstRecipe;

  //hanterar vad som händer vid ev fel
  try {
    firstRecipe = await fetchRecipe(searchTerm);
  } catch (error) {
    message.textContent = "Receptet kunde ej hämtas. Försök igen senare.";
    recipe.replaceChildren();
    console.error(error);
    return;
  }

  //rensar gamla receptet
  recipe.replaceChildren();

  //meddelande om inga recept hittas
  if (firstRecipe === undefined) {
    recipe.textContent = "Inga recept hittades!";
    return;
  }
  displayRecipe(firstRecipe);
});

//
