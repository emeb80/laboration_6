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

//sökfält, validering, felmeddelande, stoppar funktion vid fel
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    errorMessage.textContent = "Fältet måste fyllas i!";
    return;
  } else {
    errorMessage.textContent = "";
  }
  //sökord matchas med url+väljer ut recept 1 i arrayen+
  const url = "https://dummyjson.com/recipes/search?q=" + searchTerm;
  const response = await fetch(url);
  const data = await response.json();
  const firstRecipe = data.recipes[0];
  //meddelande om inga recept hittas
  if (firstRecipe === undefined) {
    recipe.textContent = "Inga recept hittades!";
    return;
  }
  //rensar gamla receptet
  recipe.replaceChildren();

  //variabler för information i receptet
  const servings = firstRecipe.servings;
  const prepTimeMinutes = firstRecipe.prepTimeMinutes;
  const difficulty = firstRecipe.difficulty;
  const ingredients = firstRecipe.ingredients;
  const instructions = firstRecipe.instructions;

  //lägger till h3 med receptnamn
  const heading = document.createElement("h3");
  heading.textContent = firstRecipe.name;
  recipe.appendChild(heading);
  //lägger till p-element för portioner, tillagningstid, svårighetsgrad
  const servingsP = document.createElement("p");
  servingsP.textContent = "Portioner: " + servings;
  recipe.appendChild(servingsP);

  const prepTimeMinutesP = document.createElement("p");
  prepTimeMinutesP.textContent = "Tillagningstid: " + prepTimeMinutes + " min";
  recipe.appendChild(prepTimeMinutesP);

  const difficultyP = document.createElement("p");
  difficultyP.textContent = "Svårighetsgrad: " + difficulty;
  recipe.appendChild(difficultyP);

  //Lägger till osorterad lista för ingredienser
  const ingredientsUl = document.createElement("ul");
  for (let i = 0; i < ingredients.length; i++) {
    const ingredientsItem = document.createElement("li");
    ingredientsItem.textContent = ingredients[i];
    ingredientsUl.appendChild(ingredientsItem);
  }
  recipe.appendChild(ingredientsUl);


  //Lägger till sorterad lista för instruktioner
  const instructionsOl = document.createElement ("ol");
  for (let i= 0; i <instructions.length; i++){
    const instructionsItem = document.createElement ("li");
    instructionsItem.textContent = instructions [i];
    instructionsOl.appendChild(instructionsItem);
  }
  recipe.appendChild(instructionsOl);
});

//
