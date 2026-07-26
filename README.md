# RD's Recipe Book

Health-first meal prep recipes with serving scaling and a combined shopping list.
Live at <https://rmitra90.github.io/recipes/>.

Static site — no build step, no dependencies. Open `index.html` in a browser, or
push to `main` and GitHub Pages serves it.

## Layout

```
index.html            markup only
css/
  base.css            reset, design tokens, focus rings
  layout.css          nav, hero, page + tab containers, footer
  recipe.css          recipe card, nutrition strip, ingredients, steps
  shopping.css        shopping list, progress bar
js/
  data/
    breakfast.js      recipe data
    meals.js          recipe data
  format.js           fmtQty / fmtUnit / esc  (pure, no DOM)
  store.js            state, persistence, queries
  recipe-view.js      renders the recipe card
  shopping-view.js    renders the shopping list
  app.js              bootstrap, page + tab switching
```

Everything hangs off one global, `window.RecipeBook`. Scripts are plain
`<script defer>` in dependency order rather than ES modules, so the page also
works when opened directly from disk over `file://`.

## Adding a recipe

Append an object to the array in `js/data/breakfast.js` or `js/data/meals.js`.
Copy the shape of an existing entry:

```js
{
  id: "shortslug",              // unique; used as the servings key
  subcat: "Overnight Oats",     // optional; groups recipes under a filter dropdown
  name: "Display Name",
  desc: "One or two sentences.",
  badges: ["No cook", "High protein"],
  baseServings: 12,
  nutrition: {calories:0, protein:0, carbs:0, fiber:0, addedSugar:0, sodium:0},
  ingredients: [{qty:6, unit:"cup", name:"Rolled oats", mod:""}],
  steps: ["Inline <strong>markup</strong> is allowed here."],
  healthNotes: ["Green check tags"],
  watchNotes: ["Red warning tags"],
  grocery: [{name:"Rolled oats", qty:"1 canister", have:false}]
}
```

Two conventions matter:

**Ingredient quantities are totals for `baseServings`, not per serving.**
The view scales by `servings / baseServings`, so at the default serving count
the card shows exactly the numbers written in the data. A 12-jar batch using
6 cups of oats is `{qty:6, unit:"cup"}` with `baseServings: 12`.

**Nutrition is per serving and never scales.** The strip is labelled
"Per serving" and holds steady when the stepper changes.

Other notes:

- Units are stored **singular** (`cup`, not `cups`). `fmtUnit` in `js/format.js`
  pluralizes for display; add irregular units to its `PLURAL_UNITS` map.
- `steps` are injected as HTML so `<strong>` works. Every other field is escaped.
- `grocery` items are keyed on lowercased name, so a staple shared by several
  recipes ticks off everywhere at once. Reuse exact names to get that behaviour.
- Checked items persist in `localStorage` under `rd_checked`.
