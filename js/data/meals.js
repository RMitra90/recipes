// Recipe data: Meals.
//
// Quantities are TOTALS for baseServings. The view scales them by
// servings / baseServings, so at the default serving count the numbers
// shown are exactly the numbers written here.
// Units are stored singular; js/format.js pluralizes for display.

window.RecipeBook = window.RecipeBook || {};
window.RecipeBook.data = window.RecipeBook.data || {};

window.RecipeBook.data.meals = [
  {
    id: "pasta",
    name: "Peanut Pasta Salad",
    desc: "Thai-inspired meal prep salad with Brami protein pasta, cauliflower, edamame, and creamy peanut dressing.",
    badges: ["20 min total","4 servings","4 days fridge","Lunch"],
    baseServings: 4,
    nutrition: {calories:480,protein:33,carbs:52,fiber:14,addedSugar:1,sodium:600},
    ingredients: [
      {qty:4,unit:"cup",name:"Brami Fusilli pasta, cooked",mod:"swap"},
      {qty:2,unit:"cup",name:"Cauliflower, small florets",mod:"swap"},
      {qty:1,unit:"cup",name:"Frozen edamame, thawed",mod:""},
      {qty:1,unit:"cup",name:"Carrots, grated",mod:""},
      {qty:1,unit:"cup",name:"Green onion, chopped",mod:""},
      {qty:8,unit:"tbsp",name:"Cilantro, chopped",mod:""},
      {qty:6,unit:"tbsp",name:"Peanuts, crushed",mod:""},
      {qty:6,unit:"tbsp",name:"Peanut butter",mod:""},
      {qty:1,unit:"",name:"Lime, juiced",mod:""},
      {qty:2,unit:"tbsp",name:"Low-sodium soy sauce",mod:"swap"},
      {qty:1,unit:"tbsp",name:"Sriracha",mod:""},
      {qty:1,unit:"tbsp",name:"Chili crunch oil",mod:""},
      {qty:1,unit:"tsp",name:"Maple syrup",mod:""},
      {qty:3,unit:"tbsp",name:"Water to thin dressing",mod:""}
    ],
    steps: [
      "Cook <strong>Brami Fusilli</strong> per package instructions. Drain and cool completely — warm pasta makes the dressing watery.",
      "Chop <strong>cauliflower</strong> into small florets. Grate <strong>carrots</strong>. Chop <strong>green onion</strong> and <strong>cilantro</strong>. Thaw <strong>edamame</strong> or mix with warm pasta to speed it up.",
      "In a jar, whisk <strong>peanut butter, lime juice, low-sodium soy sauce, sriracha, maple syrup,</strong> and <strong>water</strong> until smooth and pourable. Spoon chili crunch oil over the surface — do not stir it in.",
      "In a large bowl, combine cooled pasta, cauliflower, edamame, carrots, green onion, cilantro, and peanuts. Pour dressing over and toss well.",
      "Divide into <strong>4 airtight containers</strong>. Keeps in the fridge up to <strong>4 days</strong>. Toss before eating as dressing settles."
    ],
    healthNotes: ["Brami pasta: 21g protein + 9g fiber vs regular rotini","Cauliflower: nutritionist-approved lunch vegetable","Low-sodium soy sauce reduces sodium per serving","High fiber helps manage blood sugar from carbs"],
    watchNotes: [],
    grocery: [
      {name:"Brami Fusilli protein pasta",qty:"1 box",have:false},
      {name:"Frozen edamame (shelled)",qty:"1 bag",have:false},
      {name:"Cauliflower",qty:"1 head",have:false},
      {name:"Carrots",qty:"2-3 medium",have:false},
      {name:"Green onion",qty:"1 bunch",have:false},
      {name:"Cilantro",qty:"1 bunch",have:false},
      {name:"Peanuts (unsalted)",qty:"small bag",have:false},
      {name:"Peanut butter",qty:"1 jar",have:false},
      {name:"Limes",qty:"2",have:false},
      {name:"Low-sodium soy sauce",qty:"1 bottle",have:false},
      {name:"Chili crunch oil",qty:"1 jar",have:false},
      {name:"Maple syrup",qty:"small bottle",have:false},
      {name:"Sriracha",qty:"1 bottle",have:false}
    ]
  },
  {
    id: "kabobs",
    name: "Chicken Kabab",
    desc: "Tender marinated chicken skewers with lemon, herbs and garlic. Easy weeknight dinner with minimal oil.",
    badges: ["55 min total","10 min cook","6 servings"],
    baseServings: 6,
    nutrition: {calories:120,protein:16,carbs:4,fiber:1,addedSugar:2,sodium:283},
    ingredients: [
      {qty:2,unit:"",name:"Large chicken breasts, cubed",mod:""},
      {qty:0.5,unit:"",name:"Large lemon, juiced",mod:""},
      {qty:0.5,unit:"tbsp",name:"Honey",mod:""},
      {qty:1,unit:"tbsp",name:"Olive oil",mod:""},
      {qty:1,unit:"tsp",name:"Balsamic vinegar",mod:""},
      {qty:0.5,unit:"tbsp",name:"Oregano",mod:""},
      {qty:1.5,unit:"tsp",name:"Garlic powder",mod:""},
      {qty:0.25,unit:"tsp",name:"Salt (reduced for cardiovascular health)",mod:"reduced"},
      {qty:0.5,unit:"tsp",name:"Black pepper",mod:""},
      {qty:1,unit:"tbsp",name:"Fresh parsley, chopped",mod:"to serve"}
    ],
    steps: [
      "In a large bowl or zip-lock bag, combine <strong>lemon juice, honey, balsamic vinegar, oregano, garlic powder, salt,</strong> and <strong>black pepper</strong>. Stir together.",
      "Cut chicken breasts into <strong>1-inch cubes</strong>. Add to the marinade, cover, and refrigerate for at least <strong>30 minutes</strong> — overnight is even better.",
      "Preheat air fryer to <strong>400 degrees F</strong>. While preheating, thread approximately <strong>4 chicken cubes</strong> onto each skewer.",
      "Brush or spray the air fryer basket with olive oil. Place skewers in a <strong>single layer</strong>. Cook at 400F for <strong>5 minutes</strong>, flip, then cook <strong>5 more minutes</strong>.",
      "Check internal temperature reaches <strong>165 degrees F</strong>. Garnish with fresh parsley and serve immediately."
    ],
    healthNotes: ["16g protein per skewer with minimal fat","Air-fried — no heavy oil needed","Salt reduced to 1/4 tsp for cardiovascular health","Low carbs and controlled sodium","Pairs well with nonstarchy vegetables for a complete meal","Oregano and garlic are anti-inflammatory"],
    watchNotes: [],
    grocery: [
      {name:"Chicken breasts (boneless, skinless)",qty:"2 large",have:false},
      {name:"Lemons",qty:"1",have:false},
      {name:"Honey",qty:"small jar",have:false},
      {name:"Olive oil",qty:"1 bottle",have:false},
      {name:"Balsamic vinegar",qty:"1 bottle",have:false},
      {name:"Dried oregano",qty:"small jar",have:false},
      {name:"Garlic powder",qty:"small jar",have:false},
      {name:"Fresh parsley",qty:"1 bunch",have:false},
      {name:"Bamboo skewers",qty:"1 pack",have:false}
    ]
  },
  {
    id: "thaibasil",
    name: "Thai Basil Chicken",
    desc: "Spicy Thai basil chicken stir-fry with garlic and chili. Quick 25-minute weeknight meal with bold flavor and minimal ingredients.",
    badges: ["25 min total","4 servings","High protein","Spicy"],
    baseServings: 4,
    nutrition: {calories:180,protein:28,carbs:8,fiber:1,addedSugar:1,sodium:580},
    ingredients: [
      {qty:2,unit:"",name:"Chicken breasts, cut into bite-size pieces",mod:""},
      {qty:4,unit:"",name:"Thai chile peppers, or more to taste",mod:""},
      {qty:4,unit:"",name:"Garlic cloves, peeled",mod:""},
      {qty:4,unit:"tbsp",name:"Low-sodium soy sauce",mod:"swap"},
      {qty:3,unit:"tbsp",name:"Hoisin sauce",mod:"swap"},
      {qty:1,unit:"tsp",name:"White sugar",mod:""},
      {qty:28,unit:"",name:"Leaves fresh Thai basil",mod:""},
      {qty:1,unit:"",name:"Cooking spray",mod:""}
    ],
    steps: [
      "Grind <strong>Thai chile peppers</strong> and <strong>garlic</strong> together using a mortar and pestle or food processor until a coarse paste forms.",
      "Coat a large skillet with <strong>cooking spray</strong> and heat over medium-high heat. Add the pepper-garlic mixture and cook, stirring, until fragrant and garlic is golden brown — about <strong>1 minute</strong>.",
      "Add <strong>chicken pieces</strong> and cook, stirring, until about halfway cooked — about <strong>3 minutes</strong>.",
      "Mix in <strong>low-sodium soy sauce, hoisin sauce,</strong> and <strong>sugar</strong>. Cook and stir until chicken is no longer pink in the center — about <strong>3 more minutes</strong>.",
      "Add <strong>Thai basil leaves</strong> and stir for 10 seconds. Remove from heat and continue stirring until basil is wilted. Serve immediately."
    ],
    healthNotes: ["High protein with minimal fat","Low sugar — only 1/4 tsp per serving","Low-sodium soy sauce reduces sodium significantly","Hoisin replaces oyster sauce for familiar flavor","Thai basil and garlic are anti-inflammatory","No rice — pairs well with cauliflower rice or nonstarchy vegetables"],
    watchNotes: ["Adjust chili quantity to your heat tolerance"],
    grocery: [
      {name:"Chicken breasts (boneless, skinless)",qty:"2 large",have:false},
      {name:"Thai chile peppers",qty:"4-6 peppers",have:false},
      {name:"Garlic cloves",qty:"1 head",have:false},
      {name:"Low-sodium soy sauce",qty:"1 bottle",have:false},
      {name:"Hoisin sauce",qty:"1 jar",have:false},
      {name:"White sugar",qty:"small bag",have:false},
      {name:"Fresh Thai basil",qty:"1 bunch",have:false},
      {name:"Cooking spray",qty:"1 can",have:false}
    ]
  }
];
