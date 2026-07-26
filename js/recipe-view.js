// Two views for the Recipes page:
//   index  - a card grid of every recipe in a category
//   detail - one recipe, opened from a card or a #hash link
//
// Listeners are delegated to a container that outlives every re-render, so no
// handler is ever built into an HTML attribute string.

(function (RB) {
  "use strict";

  var store = RB.store;
  var fmtQty = RB.format.fmtQty;
  var fmtUnit = RB.format.fmtUnit;
  var esc = RB.format.esc;

  // Stands in for photography. Hues are drawn from the brand's green/copper
  // family and assigned by position, so neighbouring cards always differ --
  // hashing the id clustered several recipes into the same pink.
  var TINTS = [145, 28, 192, 82, 12, 258];

  function tintFor(i) { return TINTS[i % TINTS.length]; }

  // --- picker ----------------------------------------------------------------

  // Sits above both views. Scrolling a grid to reach a recipe is slow on a
  // phone, so the dropdown stays the fast path; the cards are for browsing.
  function picker(cat, currentId) {
    var subcats = store.getSubcats(cat);
    var recipes = store.getVisibleRecipes(cat);
    var html = '<div class="dd-row">';

    if (subcats.length > 0) {
      var label = cat === "breakfast" ? "Breakfast" : "Meals";
      var opts = '<option value="">All ' + esc(label) + "</option>";
      subcats.forEach(function (sc) {
        var sel = store.state.subcatFilter[cat] === sc ? " selected" : "";
        opts += '<option value="' + esc(sc) + '"' + sel + ">" + esc(sc) + "</option>";
      });
      html += '<div class="dd-wrap"><span class="dd-label">Category</span>'
        + '<select class="dd-select" data-action="subcat" aria-label="Filter by category">'
        + opts + "</select></div>";
    }

    // On the index nothing is open yet, so the first option is a prompt.
    var recipeOpts = currentId ? "" : '<option value="">Jump to a recipe&hellip;</option>';
    recipeOpts += recipes.map(function (r) {
      return '<option value="' + esc(r.id) + '"' + (r.id === currentId ? " selected" : "") + ">"
        + esc(r.name) + "</option>";
    }).join("");

    html += '<div class="dd-wrap dd-grow"><span class="dd-label">Recipe</span>'
      + '<select class="dd-select" data-action="jump" aria-label="Choose a recipe">'
      + recipeOpts + "</select></div>";

    return html + "</div>";
  }

  // --- index -----------------------------------------------------------------

  function card(r, i) {
    var n = r.nutrition;
    return '<button class="rcard" data-open="' + esc(r.id) + '" style="--tint:' + tintFor(i) + '">'
      + '<span class="rcard-art" aria-hidden="true"><span>' + esc(r.name.charAt(0)) + "</span></span>"
      + '<span class="rcard-body">'
      + '<span class="rcard-title">' + esc(r.name) + "</span>"
      + '<span class="rcard-desc">' + esc(r.desc) + "</span>"
      + '<span class="rcard-stats">'
      + "<span><b>" + n.calories + "</b> cal</span>"
      + "<span><b>" + n.protein + "g</b> protein</span>"
      + "<span><b>" + n.fiber + "g</b> fiber</span>"
      + "</span>"
      + '<span class="rcard-badges">'
      + r.badges.slice(0, 3).map(function (b) { return '<span class="badge">' + esc(b) + "</span>"; }).join("")
      + "</span></span></button>";
  }

  function renderIndex(cat) {
    var recipes = store.getVisibleRecipes(cat);
    var grid = recipes.length === 0
      ? '<p class="empty-note">No recipes in that category yet.</p>'
      : '<div class="rgrid">' + recipes.map(function (r, i) { return card(r, i); }).join("") + "</div>";
    document.getElementById(cat + "-recipe-container").innerHTML = picker(cat, null) + grid;
  }

  // --- detail ----------------------------------------------------------------

  function ingredientList(r, ratio) {
    return r.ingredients.map(function (ing) {
      var scaled = ing.qty * ratio;
      var struck = store.isStruck(r.id, ing.name);
      return '<li class="ing' + (struck ? " struck" : "") + '"'
        + ' data-struck="' + esc(store.struckKey(r.id, ing.name)) + '"'
        + ' role="checkbox" aria-checked="' + struck + '" tabindex="0">'
        + '<span class="ing-tick" aria-hidden="true"></span>'
        + '<span class="qty">' + fmtQty(scaled) + " " + esc(fmtUnit(ing.unit, scaled)) + "</span>"
        + '<span class="iname">' + esc(ing.name) + "</span>"
        + (ing.mod ? '<span class="mod">' + esc(ing.mod) + "</span>" : "")
        + "</li>";
    }).join("");
  }

  function nutritionStrip(n) {
    var cells = [
      [n.calories, "", "Calories"], [n.protein, "g", "Protein"], [n.carbs, "g", "Carbs"],
      [n.fiber, "g", "Fiber"], [n.addedSugar, "g", "Added sugar"], [n.sodium, "mg", "Sodium"]
    ];
    // Per serving by definition, so these never scale with the stepper.
    return '<div class="nutrition-label">Per serving</div><div class="nutrition-strip">'
      + cells.map(function (c) {
          return '<div class="nutrition-cell"><span class="val">' + c[0] + c[1] + "</span>"
            + '<span class="lbl">' + c[2] + "</span></div>";
        }).join("")
      + "</div>";
  }

  function renderDetail(cat, id) {
    var r = store.findRecipe(id);
    if (!r) { renderIndex(cat); return; }
    var servings = store.state.servings[r.id];
    var ratio = servings / r.baseServings;
    var planned = store.isSelected(r.id);

    var html = picker(cat, r.id)
      + '<div class="detail-bar">'
      + '<button class="back-btn" data-back="1">&#8592; All ' + (cat === "breakfast" ? "breakfast" : "meals") + "</button>"
      + '<div class="detail-bar-right">'
      + '<button class="plan-btn' + (planned ? " on" : "") + '" data-plan="' + esc(r.id) + '"'
      + ' aria-pressed="' + planned + '">' + (planned ? "&#10003; In this week" : "+ Add to week") + "</button>"
      + '<button class="print-btn" data-print="1">Print</button>'
      + "</div></div>"

      + '<div class="recipe-card"><div class="recipe-header"><div class="recipe-header-top">'
      + '<div><h2 class="recipe-title">' + esc(r.name) + "</h2>"
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
      + '<div class="ingredients-col">'
      + '<div class="col-head"><span class="col-label">Ingredients for ' + servings + " servings</span>"
      + '<button class="reset-link" data-reset="' + esc(r.id) + '">Reset</button></div>'
      + '<ul class="ingredient-list">' + ingredientList(r, ratio) + "</ul>"
      + '<p class="ing-hint">Tap an ingredient to cross it off while you cook.</p></div>'
      + '<div class="steps-col"><div class="col-label">Instructions</div>'
      // Steps carry authored inline <strong>, so they are not escaped.
      + r.steps.map(function (s, i) {
          return '<div class="step"><span class="step-num">' + (i + 1) + "</span>"
            + '<span class="step-text">' + s + "</span></div>";
        }).join("")
      + "</div></div>"

      + '<div class="health-notes"><div class="col-label" style="margin-bottom:0.5rem">Why this works for your goals</div>'
      + '<ul class="note-list">'
      + r.healthNotes.map(function (t) { return '<li class="hnote">' + esc(t) + "</li>"; }).join("")
      + r.watchNotes.map(function (t) { return '<li class="wnote">' + esc(t) + "</li>"; }).join("")
      + "</ul></div></div>";

    document.getElementById(cat + "-recipe-container").innerHTML = html;
  }

  function render(cat) {
    var open = store.state.openRecipe;
    if (open && store.categoryOf(open) === cat) renderDetail(cat, open);
    else renderIndex(cat);
  }

  // --- wiring ----------------------------------------------------------------

  function init(cat) {
    var wrap = document.getElementById("cat-" + cat);
    wrap.innerHTML = '<div id="' + cat + '-recipe-container"></div>';
    var container = document.getElementById(cat + "-recipe-container");

    container.addEventListener("click", function (e) {
      var open = e.target.closest("[data-open]");
      if (open) { RB.router.go("recipe/" + open.getAttribute("data-open")); return; }

      if (e.target.closest("[data-back]")) { RB.router.go(cat); return; }
      if (e.target.closest("[data-print]")) { window.print(); return; }

      var plan = e.target.closest("[data-plan]");
      if (plan) {
        store.toggleSelected(plan.getAttribute("data-plan"));
        render(cat);
        RB.shoppingView.render();
        return;
      }

      var reset = e.target.closest("[data-reset]");
      if (reset) { store.clearStruck(reset.getAttribute("data-reset")); render(cat); return; }

      var ing = e.target.closest("[data-struck]");
      if (ing) { store.toggleStruck(ing.getAttribute("data-struck")); render(cat); return; }

      var act = e.target.closest("[data-action]");
      if (act && !act.disabled && act.getAttribute("data-action") === "serv") {
        var r = store.findRecipe(store.state.openRecipe);
        if (r) { store.changeServings(r.id, parseInt(act.getAttribute("data-delta"), 10)); render(cat); }
      }
    });

    container.addEventListener("change", function (e) {
      var el = e.target.closest("[data-action]");
      if (!el) return;
      var action = el.getAttribute("data-action");

      if (action === "jump") {
        if (el.value) RB.router.go("recipe/" + el.value);
      } else if (action === "subcat") {
        store.setSubcatFilter(cat, el.value);
        // Filtering is a browsing action, so it always lands on the grid --
        // staying on a detail view that the filter may exclude would be odd.
        if (store.state.openRecipe) RB.router.go(cat);
        else render(cat);
      }
    });

    container.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var ing = e.target.closest("[data-struck]");
      if (!ing) return;
      e.preventDefault();
      store.toggleStruck(ing.getAttribute("data-struck"));
      render(cat);
    });

    render(cat);
  }

  RB.recipeView = {init: init, render: render};
})(window.RecipeBook = window.RecipeBook || {});
