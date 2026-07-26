// Bootstrap: wires up page and category switching, then starts both views.
// Loaded last, after data, format, store, and the two view modules.

(function (RB) {
  "use strict";

  var CATEGORIES = ["breakfast", "meals"];

  function showPage(page, btn) {
    document.querySelectorAll(".page").forEach(function (p) { p.classList.remove("active"); });
    document.getElementById("page-" + page).classList.add("active");
    document.querySelectorAll(".nav-links button").forEach(function (b) {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    if (page === "shopping") RB.shoppingView.render();
  }

  function showCat(cat, btn) {
    RB.store.state.currentCat = cat;
    CATEGORIES.forEach(function (c) {
      document.getElementById("cat-" + c).style.display = (c === cat) ? "block" : "none";
    });
    document.querySelectorAll(".page-tab").forEach(function (b) {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
  }

  function init() {
    document.querySelectorAll("[data-page]").forEach(function (btn) {
      btn.addEventListener("click", function () { showPage(btn.getAttribute("data-page"), btn); });
    });

    document.querySelectorAll("[data-cat]").forEach(function (btn) {
      btn.addEventListener("click", function () { showCat(btn.getAttribute("data-cat"), btn); });
    });

    CATEGORIES.forEach(RB.recipeView.init);
    RB.shoppingView.init();
    RB.shoppingView.render();
  }

  // Every script tag uses defer, so the DOM is parsed by the time this runs.
  init();
})(window.RecipeBook = window.RecipeBook || {});
