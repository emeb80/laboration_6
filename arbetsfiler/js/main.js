"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Eva Bergström
 */

//hämtar formulär, sökfält och felmeddelande
const form = document.querySelector("#searchform");

const searchInput = document.getElementById("search");

const errorMessage = document.getElementById("error");

//sökfält, validering, felmeddelande, stoppar funktion vid fel
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  console.log(searchTerm);
  if (searchTerm === "") {
    errorMessage.textContent = "Fältet måste fyllas i!";
    return;
  } else {
    errorMessage.textContent = "";
  }
});
