// Renders the recipe card for one category and handles its controls.
//
// Listeners are delegated to the category container, which outlives every
// re-render, so no handler is ever built into an HTML attribute string.

(function (RB) {
  "use strict";

  var store = RB.store;
  var fmtQty = RB.format.fmtQty;
  var fmtUnit = RB.format.fmtUnit;
  var esc = RB.format.esc;

  function containerId(cat) { return cat + "-recipe-container"; }

  function subcatDropdown(cat) {
    var subcats = store.getSubcats(cat);
    if (subcats.length === 0) return "";
    var label = cat === "breakfast" ? "Breakfast" : "Meals";
    var opts = '<option value="">All ' + label + "</option>";
    subcats.forEach(function (sc) {
      var selected = store.state.subcatFilter[cat] === sc ? " selected" : "";
      opts += '<option value="' + esc(sc) + '"' + selected + ">" + esc(sc) + "</option>";
    });
    return '<div class="dd-wrap"><span class="dd-label">Category</span>'
      + '<select class="dd-select" data-action="subcat" aria-label="Filter by category">'
      + opts + "</select></div>";
  }

  function recipeDropdown(recipes, idx) {
    var opts = recipes.map(function (rec, i) {
      return '<option value="' + i + '"' + (i === idx ? " selected" : "") + ">" + esc(rec.name) + "</option>";
    }).join("");
    return '<div class="dd-wrap"><span class="dd-label">Recipe</span>'
      + '<select class="dd-select" data-action="jump" aria-label="Jump to recipe">'
      + opts + "</select></div>";
  }

  function ingredientList(r, ratio) {
    return r.ingredients.map(function (ing) {
      var scaled = ing.qty * ratio;
      return '<li><span class="qty">' + fmtQty(scaled) + " " + esc(fmtUnit(ing.unit, scaled)) + "</span>"
        + '<span class="iname">' + esc(ing.name) + "</span>"
        + (ing.mod ? '<span class="mod">' + esc(ing.mod) + "</span>" : "")
        + "</li>";
    }).join("");
  }

  function stepList(r) {
    // Steps are authored with inline <strong> markup, so they are not escaped.
    return r.steps.map(function (s, i) {
      return '<div class="step"><span class="step-num">' + (i + 1) + "</span>"
        + '<span class="step-text">' + s + "</span></div>";
    }).join("");
  }

  function nutritionStrip(n) {
    var cells = [
      [n.calories, "", "Calories"],
      [n.protein, "g", "Protein"],
      [n.carbs, "g", "Carbs"],
      [n.fiber, "g", "Fiber"],
      [n.addedSugar, "g", "Added sugar"],
      [n.sodium, "mg", "Sodium"]
    ];
    // Values are per serving and deliberately do not scale with the stepper.
    return '<div class="nutrition-label">Per serving</div><div class="nutrition-strip">'
      + cells.map(function (c) {
          return '<div class="nutrition-cell"><span class="val">' + c[0] + c[1] + "</span>"
            + '<span class="lbl">' + c[2] + "</span></div>";
        }).join("")
      + "</div>";
  }

  function render(cat) {
    var recipes = store.getVisibleRecipes(cat);
    if (recipes.length === 0) {
      store.setSubcatFilter(cat, null);
      recipes = store.getVisibleRecipes(cat);
    }
    var idx = store.currentIndex(cat, recipes.length);
    var r = recipes[idx];
    var servings = store.state.servings[r.id];
    var ratio = servings / r.baseServings;

    var html = '<div class="dd-row">'
      + subcatDropdown(cat)
      + recipeDropdown(recipes, idx)
      + '<div class="dd-wrap" style="align-self:flex-end"><div class="recipe-nav-arrows">'
      + '<button class="arrow-btn" data-action="prev" aria-label="Previous recipe"'
      + (idx === 0 ? " disabled" : "") + ">&#8592;</button>"
      + '<button class="arrow-btn" data-action="next" aria-label="Next recipe"'
      + (idx === recipes.length - 1 ? " disabled" : "") + ">&#8594;</button>"
      + "</div></div>"
      + '<span class="recipe-counter" style="align-self:flex-end;padding-bottom:0.5rem">'
      + (idx + 1) + " of " + recipes.length + "</span>"
      + "</div>"

      + '<div class="recipe-card"><div class="recipe-header"><div class="recipe-header-top">'
      + '<div><div class="recipe-title">' + esc(r.name) + "</div>"
      + '<div class="recipe-desc">' + esc(r.desc) + "</div></div>"
      + '<div class="recipe-badges">'
      + r.badges.map(function (b) { return '<span class="badge">' + esc(b) + "</span>"; }).join("")
      + "</div></div>"

      + '<div class="serving-control"><span class="serving-label">Servings</span><div class="serving-btns">'
      + '<button class="s-btn" data-action="serv" data-delta="-1" aria-label="Decrease servings">&#8722;</button>'
      + '<span class="serving-num">' + servings + "</span>"
      + '<button class="s-btn" data-action="serv" data-delta="1" aria-label="Increase servings">&#43;</button>'
      + "</div></div></div>"

      + nutritionStrip(r.nutrition)

      + '<div class="recipe-body">'
      + '<div class="ingredients-col"><div class="col-label">Ingredients for ' + servings + " servings</div>"
      + '<ul class="ingredient-list">' + ingredientList(r, ratio) + "</ul></div>"
      + '<div class="steps-col"><div class="col-label">Instructions</div>' + stepList(r) + "</div>"
      + "</div>"

      + '<div class="health-notes"><div class="col-label" style="margin-bottom:0.5rem">Why this works for your goals</div>'
      + '<div class="health-note-list">'
      + r.healthNotes.map(function (t) { return '<span class="hnote">' + esc(t) + "</span>"; }).join("")
      + r.watchNotes.map(function (t) { return '<span class="wnote">' + esc(t) + "</span>"; }).join("")
      + "</div></div></div>";

    document.getElementById(containerId(cat)).innerHTML = html;
  }

  function init(cat) {
    var wrap = document.getElementById("cat-" + cat);
    wrap.innerHTML = '<div id="' + containerId(cat) + '"></div>';
    var container = document.getElementById(containerId(cat));

    container.addEventListener("click", function (e) {
      var el = e.target.closest("[data-action]");
      if (!el || el.disabled) return;
      var action = el.getAttribute("data-action");
      var recipes = store.getVisibleRecipes(cat);
      var idx = store.state.indices[cat];

      if (action === "prev" && idx > 0) {
        store.setIndex(cat, idx - 1);
      } else if (action === "next" && idx < recipes.length - 1) {
        store.setIndex(cat, idx + 1);
      } else if (action === "serv") {
        var r = recipes[idx];
        if (r) store.changeServings(r.id, parseInt(el.getAttribute("data-delta"), 10));
      } else {
        return;
      }
      render(cat);
    });

    container.addEventListener("change", function (e) {
      var el = e.target.closest("[data-action]");
      if (!el) return;
      var action = el.getAttribute("data-action");
      if (action === "subcat") store.setSubcatFilter(cat, el.value || null);
      else if (action === "jump") store.setIndex(cat, parseInt(el.value, 10));
      else return;
      render(cat);
    });

    render(cat);
  }

  RB.recipeView = { init: init, render: render };
})(window.RecipeBook = window.RecipeBook || {});
