// Application state and the queries that read it.
// The only persisted slice is `checked` (the shopping list), in localStorage.

(function (RB) {
  "use strict";

  var STORAGE_KEY = "rd_checked";
  var data = RB.data;

  var state = {
    currentCat: "breakfast",
    indices: {breakfast: 0, meals: 0},
    subcatFilter: {breakfast: null, meals: null},
    servings: {},
    checked: {}
  };

  // localStorage throws in private mode, so every access is guarded.
  try {
    state.checked = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch (e) {
    state.checked = {};
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.checked));
    } catch (e) { /* storage unavailable; state stays in memory only */ }
  }

  // Every recipe starts at its own batch size.
  Object.keys(data).forEach(function (cat) {
    data[cat].forEach(function (r) { state.servings[r.id] = r.baseServings; });
  });

  function allRecipes() {
    return data.breakfast.concat(data.meals);
  }

  function getSubcats(cat) {
    var subs = [];
    data[cat].forEach(function (r) {
      if (r.subcat && subs.indexOf(r.subcat) === -1) subs.push(r.subcat);
    });
    return subs;
  }

  function getVisibleRecipes(cat) {
    var filter = state.subcatFilter[cat];
    if (!filter) return data[cat];
    return data[cat].filter(function (r) { return r.subcat === filter; });
  }

  // Clamps the stored index into range and returns it, so callers and state
  // never disagree about which recipe is showing.
  function currentIndex(cat, length) {
    var idx = state.indices[cat];
    if (idx < 0 || idx >= length) idx = 0;
    state.indices[cat] = idx;
    return idx;
  }

  function setSubcatFilter(cat, subcat) {
    state.subcatFilter[cat] = subcat;
    state.indices[cat] = 0;
  }

  function setIndex(cat, idx) { state.indices[cat] = idx; }

  function changeServings(id, delta) {
    state.servings[id] = Math.max(1, state.servings[id] + delta);
  }

  // Shopping items are keyed on name alone, so an item that appears in several
  // recipes is checked off everywhere at once.
  function itemKey(itemName) {
    return String(itemName).toLowerCase();
  }

  function isChecked(itemName) {
    return !!state.checked[itemKey(itemName)];
  }

  function toggleChecked(key) {
    state.checked[key] = !state.checked[key];
    persist();
  }

  function clearChecked() {
    state.checked = {};
    persist();
  }

  RB.store = {
    state: state,
    allRecipes: allRecipes,
    getSubcats: getSubcats,
    getVisibleRecipes: getVisibleRecipes,
    currentIndex: currentIndex,
    setSubcatFilter: setSubcatFilter,
    setIndex: setIndex,
    changeServings: changeServings,
    itemKey: itemKey,
    isChecked: isChecked,
    toggleChecked: toggleChecked,
    clearChecked: clearChecked
  };
})(window.RecipeBook = window.RecipeBook || {});
