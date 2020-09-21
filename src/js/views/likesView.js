import { limitRecipeTitle } from "./searchView";
import { elements } from "./base";
import $ from "jquery";

export const toggleLikeBtn = (isLiked) => {
  const iconString = isLiked ? "icon-heart" : "icon-heart-outlined";
  document
    .querySelector(".recipe__love use")
    .setAttribute("href", `img/icons.svg#${iconString}`);
  // icons.svg#icon-heart-outlined
};

export const toggleLikeMenu = (numLikes) => {
  elements.likesMenu.css("visibility", () =>
    numLikes > 0 ? "visible" : "hidden"
  );
};

export const renderLike = (like) => {
  const markup = `
    <li>
      <a class="likes__link" href="#${like.id}">
          <figure class="likes__fig">
              <img src="${like.image}" alt="${like.title}">
          </figure>
          <div class="likes__data">
              <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
              <p class="likes__author">${like.author}</p>
          </div>
      </a>
    </li>
  `;
  elements.likesList.append(markup);
};

export const deleteLike = (id) => {
  const el = $(`.likes__link[href="#${id}"]`);
  if (el) {
    el.parent().remove();
  }
};
