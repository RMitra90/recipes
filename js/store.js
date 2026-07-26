// Application state, persistence, and the queries the views read.
//
// Three slices persist to localStorage: which recipes are planned for the week,
// which grocery items are ticked off, and which ingredients are struck through
// while cooking. Everything else is derived.

(function (RB) {
  "use strict";

  var KEYS = {checked: "rd_checked", selected: "rd_selected", struck: "rd_struck"};
  var AISLE_ORDER = ["Produce", "Dairy", "Meat", "Frozen", "Pantry", "Household"];
  var data = RB.data;

  function load(key) {
    try { return JSON.parse(localStorage.getItem(key) || "{}"); } catch (e) { return {}; }
  }

  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* private mode */ }
  }

  var state = {
    currentCat: "breakfast",
    openRecipe: null,          // recipe id when a detail view is showing, else null
    servings: {},
    checked: load(KEYS.checked),
    struck: load(KEYS.struck),
    selected: load(KEYS.selected)
  };

  function allRecipes() {
    return data.breakfast.concat(data.meals);
  }

  // Every recipe starts at its own batch size and is planned in by default,
  // so a first visit shows the full book rather than an empty shopping list.
  allRecipes().forEach(function (r) {
    state.servings[r.id] = r.baseServings;
    if (!(r.id in state.selected)) state.selected[r.id] = true;
  });
  save(KEYS.selected, state.selected);

  function findRecipe(id) {
    var all = allRecipes();
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }

  function categoryOf(id) {
    return data.breakfast.some(function (r) { return r.id === id; }) ? "breakfast" : "meals";
  }

  // --- weekly plan -----------------------------------------------------------

  function isSelected(id) { return !!state.selected[id]; }

  function toggleSelected(id) {
    state.selected[id] = !state.selected[id];
    save(KEYS.selected, state.selected);
  }

  function setAllSelected(on) {
    allRecipes().forEach(function (r) { state.selected[r.id] = on; });
    save(KEYS.selected, state.selected);
  }

  function selectedRecipes() {
    return allRecipes().filter(function (r) { return isSelected(r.id); });
  }

  // --- shopping list ---------------------------------------------------------

  function itemKey(name) { return String(name).toLowerCase(); }

  function isChecked(name) { return !!state.checked[itemKey(name)]; }

  function toggleChecked(key) {
    state.checked[key] = !state.checked[key];
    save(KEYS.checked, state.checked);
  }

  function clearChecked() {
    state.checked = {};
    save(KEYS.checked, state.checked);
  }

  // Collapses the planned recipes into one row per distinct item, grouped by
  // aisle. Identical item names always carry identical quantities in the data,
  // so merging loses nothing; the contributing recipes are kept for context.
  function shoppingList() {
    var merged = {};

    selectedRecipes().forEach(function (r) {
      r.grocery.forEach(function (it) {
        var key = itemKey(it.name);
        if (!merged[key]) {
          merged[key] = {
            name: it.name, qty: it.qty, aisle: it.aisle || "Pantry",
            have: !!it.have, recipes: []
          };
        }
        if (merged[key].recipes.indexOf(r.name) === -1) merged[key].recipes.push(r.name);
      });
    });

    var groups = {};
    Object.keys(merged).forEach(function (k) {
      var item = merged[k];
      (groups[item.aisle] = groups[item.aisle] || []).push(item);
    });

    return AISLE_ORDER
      .filter(function (a) { return groups[a]; })
      .map(function (a) {
        var items = groups[a].sort(function (x, y) { return x.name.localeCompare(y.name); });
        return {
          aisle: a,
          items: items,
          done: items.filter(function (i) { return i.have || isChecked(i.name); }).length
        };
      });
  }

  function shoppingTotals() {
    var total = 0, done = 0;
    shoppingList().forEach(function (g) { total += g.items.length; done += g.done; });
    return {total: total, done: done, pct: total > 0 ? Math.round(done / total * 100) : 0};
  }

  // --- cooking ---------------------------------------------------------------

  function struckKey(recipeId, name) { return recipeId + "::" + String(name).toLowerCase(); }

  function isStruck(recipeId, name) { return !!state.struck[struckKey(recipeId, name)]; }

  function toggleStruck(key) {
    state.struck[key] = !state.struck[key];
    save(KEYS.struck, state.struck);
  }

  function clearStruck(recipeId) {
    Object.keys(state.struck).forEach(function (k) {
      if (k.indexOf(recipeId + "::") === 0) delete state.struck[k];
    });
    save(KEYS.struck, state.struck);
  }

  // --- servings --------------------------------------------------------------

  function changeServings(id, delta) {
    state.servings[id] = Math.max(1, state.servings[id] + delta);
  }

  RB.store = {
    state: state,
    AISLE_ORDER: AISLE_ORDER,
    allRecipes: allRecipes,
    findRecipe: findRecipe,
    categoryOf: categoryOf,
    isSelected: isSelected,
    toggleSelected: toggleSelected,
    setAllSelected: setAllSelected,
    selectedRecipes: selectedRecipes,
    itemKey: itemKey,
    isChecked: isChecked,
    toggleChecked: toggleChecked,
    clearChecked: clearChecked,
    shoppingList: shoppingList,
    shoppingTotals: shoppingTotals,
    isStruck: isStruck,
    toggleStruck: toggleStruck,
    clearStruck: clearStruck,
    struckKey: struckKey,
    changeServings: changeServings
  };
})(window.RecipeBook = window.RecipeBook || {});
