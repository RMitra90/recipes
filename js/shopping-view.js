// Shopping list: pick the week's recipes, then shop a merged list by aisle.
//
// Items are collapsed to one row each and grouped the way a store is walked,
// rather than repeated once per recipe.

(function (RB) {
  "use strict";

  var store = RB.store;
  var esc = RB.format.esc;

  function planner() {
    var all = store.allRecipes();
    var on = store.selectedRecipes().length;
    return '<section class="planner"><div class="planner-head">'
      + '<h3 class="planner-title">Cooking this week</h3>'
      + '<div class="planner-actions">'
      + '<button class="link-btn" data-select="all">Select all</button>'
      + '<button class="link-btn" data-select="none">Clear</button>'
      + "</div></div>"
      + '<p class="planner-sub">' + on + " of " + all.length + " recipes planned</p>"
      + '<div class="chip-row">'
      + all.map(function (r) {
          var sel = store.isSelected(r.id);
          return '<button class="chip' + (sel ? " on" : "") + '" data-plan="' + esc(r.id) + '"'
            + ' role="checkbox" aria-checked="' + sel + '">'
            + '<span class="chip-tick" aria-hidden="true"></span>' + esc(r.name) + "</button>";
        }).join("")
      + "</div></section>";
  }

  function itemRow(it) {
    var key = store.itemKey(it.name);
    var checked = it.have || store.isChecked(it.name);
    var interactive = it.have
      ? ""
      : ' data-key="' + esc(key) + '" tabindex="0" role="checkbox" aria-checked="' + checked + '"';
    // Only worth naming the source recipes when an item is shared.
    var from = it.recipes.length > 1
      ? '<span class="shop-item-from">' + it.recipes.length + " recipes</span>"
      : "";
    var haveTag = it.have ? '<span class="have-tag">already have</span>' : "";

    return '<div class="shop-item' + (checked ? " checked" : "") + '"' + interactive + ">"
      + '<div class="shop-checkbox"><span class="checkmark">&#10003;</span></div>'
      + '<span class="shop-item-name">' + esc(it.name) + haveTag + from + "</span>"
      + '<span class="shop-item-qty">' + esc(it.qty) + "</span>"
      + "</div>";
  }

  function render() {
    var groups = store.shoppingList();
    var totals = store.shoppingTotals();

    var list = groups.length === 0
      ? '<p class="empty-note">No recipes planned yet. Pick a few above and the list builds itself.</p>'
      : groups.map(function (g) {
          return '<div class="shop-section"><div class="shop-section-header">'
            + '<span class="shop-section-title">' + esc(g.aisle) + "</span>"
            + '<span class="shop-section-count">' + g.done + "/" + g.items.length + " done</span>"
            + "</div>" + g.items.map(itemRow).join("") + "</div>";
        }).join("");

    document.getElementById("shopping-planner").innerHTML = planner();
    document.getElementById("progress-label").textContent =
      totals.total === 0 ? "Nothing to buy yet" : totals.done + " of " + totals.total + " items checked";
    document.getElementById("progress-fill").style.width = totals.pct + "%";
    document.getElementById("shopping-content").innerHTML = list;
  }

  function toggleAt(el) {
    store.toggleChecked(el.getAttribute("data-key"));
    render();
  }

  function init() {
    var page = document.getElementById("page-shopping");

    page.addEventListener("click", function (e) {
      var plan = e.target.closest("[data-plan]");
      if (plan) {
        store.toggleSelected(plan.getAttribute("data-plan"));
        render();
        RB.recipeView.render(store.state.currentCat);
        return;
      }

      var sel = e.target.closest("[data-select]");
      if (sel) { store.setAllSelected(sel.getAttribute("data-select") === "all"); render(); return; }

      if (e.target.closest("#clear-checked")) { store.clearChecked(); render(); return; }

      var item = e.target.closest(".shop-item[data-key]");
      if (item) toggleAt(item);
    });

    page.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var item = e.target.closest(".shop-item[data-key]");
      var chip = e.target.closest("[data-plan]");
      if (item) { e.preventDefault(); toggleAt(item); }
      else if (chip && e.key === " ") { e.preventDefault(); chip.click(); }
    });
  }

  RB.shoppingView = {init: init, render: render};
})(window.RecipeBook = window.RecipeBook || {});
