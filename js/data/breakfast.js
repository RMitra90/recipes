// Recipe data: Breakfast.
//
// Quantities are TOTALS for baseServings. The view scales them by
// servings / baseServings, so at the default serving count the numbers
// shown are exactly the numbers written here.
// Units are stored singular; js/format.js pluralizes for display.

window.RecipeBook = window.RecipeBook || {};
window.RecipeBook.data = window.RecipeBook.data || {};

window.RecipeBook.data.breakfast = [
  {
    id: "oats",
    subcat: "Overnight Oats",
    name: "Coffee Protein Overnight Oats",
    desc: "Cappuccino-flavored protein oats in mason jars. Zero added sugar, 28g protein per jar.",
    badges: ["5 min prep","No cooking","12 servings","95mg caffeine"],
    baseServings: 12,
    nutrition: {calories:320,protein:28,carbs:35,fiber:6,addedSugar:0,sodium:180},
    ingredients: [
      {qty:6,unit:"cup",name:"Rolled oats (old fashioned)",mod:""},
      {qty:12,unit:"tbsp",name:"Dymatize ISO100 Cappuccino",mod:""},
      {qty:6,unit:"cup",name:"2% milk",mod:""},
      {qty:3,unit:"cup",name:"Plain low-fat Greek yogurt",mod:""},
      {qty:6,unit:"tbsp",name:"Chia seeds",mod:""},
      {qty:3,unit:"tsp",name:"Ground cinnamon",mod:""},
      {qty:3,unit:"cup",name:"Blueberries or raspberries",mod:"add morning of"}
    ],
    steps: [
      "In each wide-mouth 16oz mason jar, add <strong>1/2 cup oats</strong>, <strong>1 tbsp protein powder</strong>, <strong>1/2 tbsp chia seeds</strong>, and <strong>1/4 tsp cinnamon</strong>. Stir together.",
      "Pour in <strong>1/2 cup 2% milk</strong> and <strong>1/4 cup Greek yogurt</strong>. Stir well until no dry clumps remain and protein powder is fully dissolved.",
      "Seal jars and refrigerate for at least <strong>6 hours or overnight</strong>. Oats absorb the liquid and thicken significantly.",
      "Each morning, top with <strong>1/4 cup fresh or frozen berries</strong> and eat cold straight from the jar. No heating needed.",
      "Keeps in the fridge for <strong>up to 5 days</strong>. Prep all 12 jars Sunday night to cover the full week."
    ],
    healthNotes: ["0g added sugar","High protein stabilizes blood sugar","Fiber slows glucose absorption","Berries are lowest-glycemic fruit","Cinnamon supports blood sugar regulation","Great for skipping breakfast habit"],
    watchNotes: ["95mg caffeine per jar — check sensitivity before sharing"],
    grocery: [
      {name:"Rolled oats (old fashioned)",qty:"1 large canister",aisle:"Pantry",have:false},
      {name:"Dymatize ISO100 Cappuccino",qty:"1 tub",aisle:"Pantry",have:false},
      {name:"2% milk",qty:"1 gallon",aisle:"Dairy",have:false},
      {name:"Plain low-fat Greek yogurt",qty:"32oz tub",aisle:"Dairy",have:false},
      {name:"Chia seeds",qty:"bulk bag",aisle:"Pantry",have:false},
      {name:"Ground cinnamon",qty:"small jar",aisle:"Pantry",have:false},
      {name:"Frozen berries (blueberries or raspberries)",qty:"2 x 12oz bags",aisle:"Frozen",have:false},
      {name:"Wide-mouth 16oz mason jars",qty:"pack of 12",aisle:"Household",have:false}
    ]
  },
  {
    id: "tiramisuoats",
    subcat: "Overnight Oats",
    name: "Banana Tiramisu Protein Oats",
    desc: "Coffee-soaked protein oats with banana and a dusting of cocoa, inspired by tiramisu. No added sugar.",
    badges: ["5 min prep","No cooking","12 servings","Coffee flavor"],
    baseServings: 12,
    nutrition: {calories:300,protein:29,carbs:34,fiber:7,addedSugar:0,sodium:170},
    ingredients: [
      {qty:6,unit:"cup",name:"Rolled oats (old fashioned)",mod:""},
      {qty:12,unit:"tbsp",name:"Dymatize ISO100 Cappuccino",mod:""},
      {qty:6,unit:"cup",name:"2% milk",mod:""},
      {qty:3,unit:"cup",name:"Plain low-fat Greek yogurt",mod:""},
      {qty:6,unit:"tbsp",name:"Chia seeds",mod:""},
      {qty:3,unit:"tsp",name:"Ground cinnamon",mod:""},
      {qty:3,unit:"",name:"Small bananas, mashed (1/4 per jar)",mod:""},
      {qty:6,unit:"tsp",name:"Unsweetened cocoa powder",mod:"dust on top"}
    ],
    steps: [
      "In each wide-mouth 16oz mason jar, add <strong>1/2 cup oats</strong>, <strong>1 tbsp protein powder</strong>, <strong>1/2 tbsp chia seeds</strong>, and <strong>1/4 tsp cinnamon</strong>. Stir together.",
      "Mash <strong>1/4 small banana</strong> per jar and mix it into the dry ingredients so it soaks in like a tiramisu layer, not just a topping.",
      "Pour in <strong>1/2 cup 2% milk</strong> and <strong>1/4 cup Greek yogurt</strong>. Stir well until no dry clumps remain and everything is fully combined.",
      "Seal jars and refrigerate for at least <strong>6 hours or overnight</strong>. Oats absorb the liquid and thicken significantly.",
      "Each morning, dust the top with <strong>1/2 tsp unsweetened cocoa powder</strong> just like a classic tiramisu finish. Eat cold straight from the jar.",
      "Keeps in the fridge for <strong>up to 5 days</strong>. Prep all 12 jars Sunday night to cover the full week."
    ],
    healthNotes: ["0g added sugar — banana provides all the sweetness","High protein stabilizes blood sugar","Small banana portion (1/4, not 1/2) limits sugar impact","Unsweetened cocoa adds antioxidants with negligible carbs","Coffee flavor doubled from protein powder","Cinnamon supports blood sugar regulation"],
    watchNotes: ["Contains caffeine from protein powder — check sensitivity before sharing"],
    grocery: [
      {name:"Rolled oats (old fashioned)",qty:"1 large canister",aisle:"Pantry",have:false},
      {name:"Dymatize ISO100 Cappuccino",qty:"1 tub",aisle:"Pantry",have:false},
      {name:"2% milk",qty:"1 gallon",aisle:"Dairy",have:false},
      {name:"Plain low-fat Greek yogurt",qty:"32oz tub",aisle:"Dairy",have:false},
      {name:"Chia seeds",qty:"bulk bag",aisle:"Pantry",have:false},
      {name:"Ground cinnamon",qty:"small jar",aisle:"Pantry",have:false},
      {name:"Bananas",qty:"3-4 small",aisle:"Produce",have:false},
      {name:"Unsweetened cocoa powder",qty:"small container",aisle:"Pantry",have:false},
      {name:"Wide-mouth 16oz mason jars",qty:"pack of 12",aisle:"Household",have:false}
    ]
  },
  {
    id: "chocpboats",
    subcat: "Overnight Oats",
    name: "Chocolate Peanut Butter Protein Oats",
    desc: "Rich, mocha tinged overnight oats with real peanut butter and a fresh berry topping. Zero added sugar, with the highest protein and fiber of any jar in the book. This is the hearty, training day option.",
    badges: ["No cook","High protein","High fiber","Make ahead"],
    baseServings: 12,
    nutrition: {calories:555,protein:41,carbs:48,fiber:11,addedSugar:0,sodium:240},
    ingredients: [
      {qty:6,unit:"cup",name:"Rolled oats (old fashioned)",mod:""},
      {qty:6,unit:"cup",name:"2% milk",mod:""},
      {qty:3,unit:"cup",name:"Plain low-fat Greek yogurt",mod:""},
      {qty:9,unit:"scoop",name:"Dymatize ISO100 Cappuccino",mod:""},
      {qty:24,unit:"tbsp",name:"Natural peanut butter (Santa Cruz Organic Creamy)",mod:""},
      {qty:12,unit:"tbsp",name:"Unsweetened cocoa powder",mod:""},
      {qty:12,unit:"tsp",name:"Chia seeds",mod:""},
      {qty:3,unit:"cup",name:"Blueberries or chopped strawberries",mod:"add morning of"}
    ],
    steps: [
      "In a large container, stir together the <strong>milk</strong>, <strong>protein powder</strong>, and <strong>cocoa powder</strong> first, until fully dissolved with no dry pockets. Doing the liquids first prevents clumping.",
      "Add the <strong>peanut butter</strong> and stir until it is worked through the liquid rather than sitting in a lump. Warming it for a few seconds helps it spread evenly so the flavor is in every bite.",
      "Stir in the <strong>oats</strong>, <strong>Greek yogurt</strong>, and <strong>chia seeds</strong> until evenly combined.",
      "Divide evenly among <strong>12 jars</strong>. Cover and refrigerate <strong>overnight, or at least 4 hours</strong>. Store the jars plain, without fruit. Keeps <strong>5 days</strong>.",
      "In the morning, top a jar with a <strong>small handful of blueberries or chopped strawberries</strong>. Eat cold, or add a splash of milk to loosen."
    ],
    healthNotes: ["Zero added sugar, aligned with blood sugar goals","Highest fiber of any oats in the book at 11g per jar, which helps blunt the glucose response","High protein at 41g per jar for staying power","Peanut butter adds heart healthy unsaturated fat","Berries are added fresh each morning, so the jars keep a clean 5 days"],
    watchNotes: ["Richest jar in the book at about 555 calories, best as a training day or hungry morning option","Contains caffeine from the cappuccino protein powder","Sets thick, loosen with a splash of milk if needed"],
    grocery: [
      {name:"Rolled oats (old fashioned)",qty:"1 large canister",aisle:"Pantry",have:false},
      {name:"2% milk",qty:"1 gallon",aisle:"Dairy",have:false},
      {name:"Plain low-fat Greek yogurt",qty:"32oz tub",aisle:"Dairy",have:false},
      {name:"Dymatize ISO100 Cappuccino",qty:"1 tub",aisle:"Pantry",have:false},
      {name:"Natural peanut butter (Santa Cruz Organic Creamy)",qty:"1 jar",aisle:"Pantry",have:false},
      {name:"Unsweetened cocoa powder",qty:"small container",aisle:"Pantry",have:false},
      {name:"Chia seeds",qty:"bulk bag",aisle:"Pantry",have:false},
      {name:"Blueberries or strawberries",qty:"3 cups fresh",aisle:"Produce",have:false}
    ]
  }
];
