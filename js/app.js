// Bootstrap and hash routing.
//
// Routes:
//   #breakfast | #meals   category index
//   #recipe/<id>          one recipe
//   #shopping             shopping list
// Anything unrecognised falls back to the breakfast index.

(function (RB) {
  "use strict";

  var CATEGORIES = ["breakfast", "meals"];
  var store = RB.store;

  function parse(hash) {
    var h = (hash || "").replace(/^#\/?/, "");
    if (h === "shopping") return {page: "shopping"};
    if (h.indexOf("recipe/") === 0) {
      var id = h.slice(7);
      var r = store.findRecipe(id);
      if (r) return {page: "recipes", cat: store.categoryOf(id), recipe: id};
    }
    if (CATEGORIES.indexOf(h) !== -1) return {page: "recipes", cat: h};
    return {page: "recipes", cat: "breakfast"};
  }

  function go(path) {
    if (window.location.hash === "#" + path) apply();
    else window.location.hash = path;
  }

  function apply() {
    var route = parse(window.location.hash);

    document.querySelectorAll(".page").forEach(function (p) { p.classList.remove("active"); });
    document.getElementById("page-" + route.page).classList.add("active");

    document.querySelectorAll(".nav-links button").forEach(function (b) {
      var on = b.getAttribute("data-page") === route.page;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", String(on));
    });

    if (route.page === "recipes") {
      store.state.currentCat = route.cat;
      store.state.openRecipe = route.recipe || null;

      CATEGORIES.forEach(function (c) {
        document.getElementById("cat-" + c).style.display = (c === route.cat) ? "block" : "none";
        // Re-render the hidden category too, so an open detail view from an
        // earlier route does not linger in the DOM as a duplicate heading.
        if (c !== route.cat) RB.recipeView.render(c);
      });
      document.querySelectorAll(".page-tab").forEach(function (b) {
        var on = b.getAttribute("data-cat") === route.cat;
        b.classList.toggle("active", on);
        b.setAttribute("aria-selected", String(on));
      });
      RB.recipeView.render(route.cat);
    } else {
      RB.shoppingView.render();
    }

    // The hero is an introduction, not chrome: it belongs on the index and
    // only gets in the way when reading a recipe or standing in a shop.
    var showHero = route.page === "recipes" && !route.recipe;
    document.querySelector(".hero").hidden = !showHero;
    document.querySelector(".page-tabs").hidden = route.page !== "recipes";

    window.scrollTo(0, 0);
  }

  function init() {
    document.querySelectorAll("[data-page]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        go(btn.getAttribute("data-page") === "shopping" ? "shopping" : store.state.currentCat);
      });
    });

    document.querySelectorAll("[data-cat]").forEach(function (btn) {
      btn.addEventListener("click", function () { go(btn.getAttribute("data-cat")); });
    });

    CATEGORIES.forEach(RB.recipeView.init);
    RB.shoppingView.init();

    window.addEventListener("hashchange", apply);
    apply();
  }

  RB.router = {go: go, parse: parse, apply: apply};

  // Scripts are deferred, so the DOM is parsed by the time this runs.
  init();
})(window.RecipeBook = window.RecipeBook || {});
