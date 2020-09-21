import { elements } from "./base";
import $ from "jquery";

export const getInput = () => elements.searchInput.val();

export const clearInput = () => {
  elements.searchInput.val("");
};

export const clearResults = () => {
  elements.searchResList.html("");
  elements.searchResPages.html("");
};

export const highlightSelected = (id) => {
  const resultsArr = Array.from($(".results__link"));
  resultsArr.forEach((el) => {
    el.classList.remove("results__link--active");
  });

  $(`.results__link[href="#${id}"]`).addClass("results__link--active");
};

// "Pasta with tomato and spinach"
/*
acc: 0 // acc + curr.lenght = 5 / newtitle = {"Pasta"}
acc: 5 // acc + curr.lenght = 9 / newtitle = {"Pasta", "with"}
acc: 9 // acc + curr.lenght = 15 / newtitle = {"Pasta", "with","tomato"}
acc: 15 // acc + curr.lenght = 18 / newtitle = {"Pasta", "with","tomato"}
*/
const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, curr) => {
      if (acc + curr.length <= limit) {
        newTitle.push(curr);
      }
      return acc + curr.length;
    }, 0);
    return `${newTitle.join(" ")} ...`;
  }
  return title;
};

const renderRecipe = (recipe) => {
  const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
  elements.searchResList.append(markup);
};

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>
    <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${
              type === "prev" ? "left" : "right"
            }"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;

  if (page === 1 && pages > 1) {
    // Button to go to next page
    button = createButton(page, "next");
  } else if (page < pages) {
    // Both buttons
    button = `${createButton(page, "prev")} ${createButton(page, "next")} `;
  } else if (page === pages && pages > 1) {
    // Button to go to prev page
    button = createButton(page, "prev");
  }
  elements.searchResPages.append(button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  // render results of current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);

  // render pagination buttons
  renderButtons(page, recipes.length, resPerPage);
};
