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
  recipe.css          index grid, recipe card, nutrition, ingredients
  shopping.css        weekly planner, aisle sections, progress bar
  print.css           print-only (media="print")
js/
  data/
    breakfast.js      recipe data
    meals.js          recipe data
  format.js           fmtQty / fmtUnit / esc  (pure, no DOM)
  store.js            state, persistence, shopping aggregation
  recipe-view.js      index grid + recipe detail
  shopping-view.js    weekly planner + merged shopping list
  app.js              bootstrap and hash routing
```

Everything hangs off one global, `window.RecipeBook`. Scripts are plain
`<script defer>` in dependency order rather than ES modules, so the page also
works when opened directly from disk over `file://`.

## Routes

| Hash | View |
|---|---|
| `#breakfast` / `#meals` | category index |
| `#recipe/<id>` | one recipe (shareable link) |
| `#shopping` | weekly plan and shopping list |

Anything unrecognised falls back to the breakfast index.

## How the shopping list works

The list is built from the recipes ticked under **Cooking this week**, not from
every recipe in the book. Items are merged to one row each and grouped by aisle
in the order `store.js` lists them (`AISLE_ORDER`). A `have: true` item shows as
already owned and is not interactive.

Three slices persist to `localStorage`: `rd_selected` (the weekly plan),
`rd_checked` (ticked groceries), `rd_struck` (ingredients crossed off while
cooking).

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
  grocery: [{name:"Rolled oats", qty:"1 canister", aisle:"Pantry", have:false}]
}
```

`aisle` must be one of `Produce`, `Dairy`, `Meat`, `Frozen`, `Pantry`,
`Household` — anything else falls back to Pantry.

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
