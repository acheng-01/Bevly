'use strict'

const searchURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const searchURL2 = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const ingredientURLFront = 'https://www.thecocktaildb.com/images/ingredients/';
const ingredientURLEnd = '-Small.png';
const ingredientImageArray = [];
const ingredientArray = []

/* Functions for clearing or hiding what was previously displayed */

function fullReset() {
    if (!$('.results').hasClass('hidden')) {
        $('.results').addClass('hidden');
    }
    if (!$('.details').hasClass('hidden')) {
        $('.details').addClass('hidden');
    }
    $('#drink-search').val('');
}

function clearDetails() {
    $('.drink-name').empty();
    $('.cocktail-photo').empty();
    $('.ingredients').empty();
    $('.instructions').empty();
}

/* Display functions */

function displayDrinkInfo(responseJson) {
    clearDetails();
    if (!$('.error-msg').hasClass('hidden')) {
        $('.error-msg').addClass('hidden');
    }
    handleIngredients(responseJson);
    $('.results').addClass('hidden');
    $('.drink-name').append(`${responseJson.drinks[0].strDrink}`);
    $('.cocktail-photo').append(`<img src='${responseJson.drinks[0].strDrinkThumb}'>`);
    
    for (let j = 0; j < ingredientImageArray.length; j++) {
        $('.ingredients').append(`
            <li>
                <img src='${ingredientImageArray[j]}'>
                <p>${ingredientArray[j]}</p>
            </li>`);
    };

    $('.instructions').append(`
        <p>${responseJson.drinks[0].strInstructions}</p>`);
    
    $('.details').removeClass('hidden');
}

function displayResults(responseJson) {
    $('.details').addClass('hidden');
    $('.results').empty();
    if (!$('.error-msg').hasClass('hidden')) {
        $('.error-msg').addClass('hidden');
    }
    if (responseJson.drinks === null) {
        return $('.error-msg').removeClass('hidden');
    }

    for (let i = 0; i < responseJson.drinks.length; i++) {
        const base = responseJson.drinks[i];

        $('.results').append(`
            <li>
                <img src=${base.strDrinkThumb}> 
                <button class='result' onclick='getCocktailById(${base.idDrink})'>${base.strDrink}</button>
            </li>`
        );
    };

    $('.results').removeClass('hidden');
}

/* All the functions for calling the API */

function getCocktails(search) {
    const url = searchURL + search;
    
    fetch(url)
        .then (response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            console.log(`${err.message}`);
        });
}

function getCocktailById(id) {
    const url = searchURL2 + id;
    console.log(url)

    fetch(url)
        .then (response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayDrinkInfo(responseJson))
        .catch(err => {
            console.log(`${err.message}`);
        });
}

function getRandomCocktail() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayDrinkInfo(responseJson))
        .catch(err => {
            console.log(`${err.message}`);
        });
}

/* Handlers */
 
function handleIngredients(responseJson) {
    ingredientArray.splice(0,ingredientArray.length);
    ingredientImageArray.splice(0,ingredientImageArray.length);

    for (let k = 1; k < 16; k++) {
        const lastPart = 'strIngredient' + k;
        const lastPart2 = 'strMeasure' + k;
        if (responseJson.drinks[0][lastPart] != null) {
            //generate image URLs
            ingredientImageArray.push(ingredientURLFront + responseJson.drinks[0][lastPart] + ingredientURLEnd);
            //generate ingredient name and respective amounts
            if (responseJson.drinks[0][lastPart2] != null) {
                ingredientArray.push(responseJson.drinks[0][lastPart2].trim() + ' ' + responseJson.drinks[0][lastPart].trim());
            }
            else {
                ingredientArray.push(responseJson.drinks[0][lastPart]);
            }
        }
        else {
            k = 16;
        }
    };
}

/* Event listeners */

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#drink-search').val();
        getCocktails(searchTerm);
    });
}

$(function() {
    watchForm();
});
