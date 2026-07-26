// Renders the shopping list: one section per recipe, plus overall progress.
//
// Rows behave as checkboxes and are keyed on item name, so a staple used by
// several recipes is ticked off everywhere at once.

(function (RB) {
  "use strict";

  var store = RB.store;
  var esc = RB.format.esc;

  function itemRow(it) {
    var key = store.itemKey(it.name);
    var checked = it.have || store.isChecked(it.name);
    // Items marked have:true are informational only, so they are not interactive.
    var interactive = it.have
      ? ""
      : ' data-key="' + esc(key) + '" tabindex="0" role="checkbox" aria-checked="' + checked + '"';
    var haveTag = it.have ? '<span class="have-tag">already have</span>' : "";

    return '<div class="shop-item' + (checked ? " checked" : "") + '"' + interactive + ">"
      + '<div class="shop-checkbox"><span class="checkmark">&#10003;</span></div>'
      + '<span class="shop-item-name">' + esc(it.name) + haveTag + "</span>"
      + '<span class="shop-item-qty">' + esc(it.qty) + "</span>"
      + "</div>";
  }

  function render() {
    var total = 0, done = 0, html = "";

    store.allRecipes().forEach(function (r) {
      var sectionDone = r.grocery.filter(function (it) {
        return it.have || store.isChecked(it.name);
      }).length;
      total += r.grocery.length;
      done += sectionDone;

      html += '<div class="shop-section"><div class="shop-section-header">'
        + '<span class="shop-section-title">' + esc(r.name) + "</span>"
        + '<span class="shop-section-count">' + sectionDone + "/" + r.grocery.length + " done</span>"
        + "</div>"
        + r.grocery.map(itemRow).join("")
        + "</div>";
    });

    var pct = total > 0 ? Math.round(done / total * 100) : 0;
    document.getElementById("progress-label").textContent = done + " of " + total + " items checked";
    document.getElementById("progress-fill").style.width = pct + "%";
    document.getElementById("shopping-content").innerHTML = html;
  }

  function init() {
    var content = document.getElementById("shopping-content");

    content.addEventListener("click", function (e) {
      var item = e.target.closest(".shop-item[data-key]");
      if (!item) return;
      store.toggleChecked(item.getAttribute("data-key"));
      render();
    });

    content.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var item = e.target.closest(".shop-item[data-key]");
      if (!item) return;
      e.preventDefault();
      store.toggleChecked(item.getAttribute("data-key"));
      render();
    });

    document.getElementById("clear-checked").addEventListener("click", function () {
      store.clearChecked();
      render();
    });
  }

  RB.shoppingView = { init: init, render: render };
})(window.RecipeBook = window.RecipeBook || {});
