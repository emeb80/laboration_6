"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Eva Bergström 
 */

//hämtar formulär, sökfält och felmeddelande
const form = document.querySelector("#searchform");

const searchInput = document.getElementById("search");

const errorMessage = document.getElementById("error");

form.addEventListener("submit", function (event){
    event.preventDefault();
    const searchTerm = searchInput.value;
    console.log(searchTerm);
});