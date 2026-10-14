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
  if (firstRecipe===undefined){
    recipe.textContent = "Inga recept hittades!";
    return;
  }
//rensar gamla receptet
recipe.replaceChildren();
  //lägger till h3 med receptnamn
  const heading = document.createElement("h3");
  heading.textContent = firstRecipe.name;
  recipe.appendChild(heading);

  console.log(firstRecipe.name);
});

//
