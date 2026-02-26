// menu-data.js — Mock catalog for Checkers Pizza

const STORE = {
  id: 'redmond-01',
  name: 'Checkers Pizza — Redmond',
  address: '16011 NE 36th Way',
  city: 'Redmond',
  state: 'WA',
  zip: '98052',
  phone: '(425) 555-0199',
  deliveryEstimate: '20-35 minutes',
  hours: {
    carryout: { sunThu: '10:00am - 12:00am', friSat: '10:00am - 1:00am' },
    delivery: { sunThu: '10:00am - 12:00am', friSat: '10:00am - 1:00am' }
  }
};

const CATEGORIES = [
  { id: 'build-your-own', name: 'Build Your Own', badge: null },
  { id: 'specialty', name: 'Specialty Pizzas', badge: 'NEW!' },
  { id: 'breads', name: 'Breads', badge: 'NEW!' },
  { id: 'loaded-tots', name: 'Loaded Tots', badge: null },
  { id: 'chicken', name: 'Chicken', badge: null },
  { id: 'desserts', name: 'Desserts', badge: 'NEW!' },
  { id: 'pastas', name: 'Oven-Baked Pastas', badge: null },
  { id: 'sandwiches', name: 'Oven-Baked Sandwiches', badge: null },
  { id: 'salads', name: 'Salads', badge: null },
  { id: 'drinks', name: 'Drinks', badge: null },
  { id: 'extras', name: 'Extras', badge: null }
];

// ============ UNIFIED PRODUCT CATALOG ============
// Every orderable item is a "product". Products with customizable: true
// support size/crust/topping selection (pizza flow). All others are
// simple add-to-cart items.

const PRODUCTS = [
  // ── Build Your Own (customizable pizzas — simple bases to customize) ──
  { id: 'cheese', category: 'build-your-own', name: 'Cheese', description: 'A timeless classic — 100% real mozzarella on our signature sauce.', basePrice: 10.99, tag: null, defaultToppings: [], calories: '280 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'pepperoni', category: 'build-your-own', name: 'Pepperoni', description: 'Classic pepperoni with 100% real mozzarella on our signature sauce.', basePrice: 12.99, tag: 'TRENDING', defaultToppings: ['pepperoni'], calories: '310 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'margherita', category: 'build-your-own', name: 'Margherita', description: 'Fresh mozzarella, tomatoes, and basil on a garlic-herb crust.', basePrice: 12.99, tag: null, defaultToppings: ['tomatoes'], calories: '290 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'white-pizza', category: 'build-your-own', name: 'White Pizza', description: 'Creamy Alfredo sauce with garlic, ricotta, mozzarella, and provolone.', basePrice: 13.49, tag: null, defaultToppings: [], calories: '300 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'garlic-lovers', category: 'build-your-own', name: 'Garlic Lovers', description: 'Roasted garlic sauce with mozzarella and a parmesan blend.', basePrice: 11.99, tag: null, defaultToppings: [], calories: '285 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'buffalo-base', category: 'build-your-own', name: 'Buffalo Style', description: 'Spicy buffalo sauce base with mozzarella. Add your favorite toppings!', basePrice: 12.49, tag: 'NEW!', defaultToppings: [], calories: '295 Cal/slice', emoji: '🍕', customizable: true },

  // ── Specialty Pizzas (customizable — signature combos) ──
  { id: 'meatzza', category: 'specialty', name: 'MeatZZa', description: 'Pepperoni, ham, Italian sausage and beef, sandwiched between two layers of mozzarella.', basePrice: 15.99, tag: null, defaultToppings: ['pepperoni', 'ham', 'italian-sausage', 'beef'], calories: '380 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'extravaganzza', category: 'specialty', name: 'ExtravaganZZa', description: 'Pepperoni, ham, Italian sausage, beef, onions, green peppers, mushrooms, black olives, and mozzarella.', basePrice: 16.99, tag: null, defaultToppings: ['pepperoni', 'ham', 'italian-sausage', 'beef', 'onions', 'green-peppers', 'mushrooms', 'black-olives'], calories: '360 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'veggie', category: 'specialty', name: 'Veggie Supreme', description: 'Mushrooms, green peppers, onions, black olives, tomatoes, and mozzarella on our signature sauce.', basePrice: 14.99, tag: 'NEW!', defaultToppings: ['mushrooms', 'green-peppers', 'onions', 'black-olives', 'tomatoes'], calories: '270 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'bbq-chicken', category: 'specialty', name: 'BBQ Chicken', description: 'Grilled chicken, BBQ sauce, onions, mozzarella and provolone.', basePrice: 15.99, tag: null, defaultToppings: ['chicken', 'onions'], calories: '320 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'spicy-bacon', category: 'specialty', name: 'Spicy Chicken Bacon Ranch', description: 'Grilled chicken breast, creamy ranch, smoked bacon, jalapeños, provolone and mozzarella.', basePrice: 16.99, tag: 'NEW!', defaultToppings: ['chicken', 'bacon', 'jalapenos'], calories: '350 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'hawaiian', category: 'specialty', name: 'Hawaiian', description: 'Ham, pineapple, mozzarella, and our signature sauce.', basePrice: 13.99, tag: null, defaultToppings: ['ham', 'pineapple'], calories: '300 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'supreme', category: 'specialty', name: 'Supreme', description: 'Pepperoni, sausage, green peppers, onions, mushrooms, and black olives on our signature sauce.', basePrice: 16.49, tag: null, defaultToppings: ['pepperoni', 'italian-sausage', 'green-peppers', 'onions', 'mushrooms', 'black-olives'], calories: '340 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'philly-steak', category: 'specialty', name: 'Philly Cheese Steak', description: 'Sliced steak, onions, green peppers, mushrooms, and provolone on a garlic parmesan white sauce.', basePrice: 16.99, tag: null, defaultToppings: ['beef', 'onions', 'green-peppers', 'mushrooms'], calories: '370 Cal/slice', emoji: '🍕', customizable: true },

  // ── Breads ──
  { id: 'cheesy-bread', category: 'breads', name: 'Stuffed Cheesy Bread', description: 'Oven-baked breadsticks stuffed with cheese and drizzled with garlic butter.', basePrice: 7.99, tag: null, calories: '180 Cal/piece', emoji: '🧀', customizable: false },
  { id: 'garlic-breadsticks', category: 'breads', name: 'Garlic Breadsticks', description: 'Warm, soft breadsticks brushed with garlic butter and Italian herbs.', basePrice: 5.99, tag: null, calories: '140 Cal/piece', emoji: '🥖', customizable: false },
  { id: 'cinnamon-twists', category: 'breads', name: 'Cinnamon Bread Twists', description: 'Sweet bread twists dusted with cinnamon sugar, served with vanilla icing.', basePrice: 6.49, tag: 'NEW!', calories: '190 Cal/piece', emoji: '🥨', customizable: false },
  { id: 'garlic-knots', category: 'breads', name: 'Garlic Knots', description: 'Soft, hand-tied bread knots tossed in garlic butter and parmesan. 8 per order.', basePrice: 6.49, tag: null, calories: '120 Cal/piece', emoji: '🥖', customizable: false },
  { id: 'cheesy-marinara-bread', category: 'breads', name: 'Cheesy Marinara Bread', description: 'Toasted bread topped with marinara, melted mozzarella, and Italian seasonings.', basePrice: 7.49, tag: null, calories: '200 Cal/piece', emoji: '🍞', customizable: false },

  // ── Loaded Tots ──
  { id: 'classic-loaded-tots', category: 'loaded-tots', name: 'Classic Loaded Tots', description: 'Crispy tots loaded with cheese, bacon, and ranch.', basePrice: 6.99, tag: null, calories: '320 Cal/serving', emoji: '🥔', customizable: false },
  { id: 'buffalo-chicken-tots', category: 'loaded-tots', name: 'Buffalo Chicken Tots', description: 'Tots topped with buffalo chicken, blue cheese crumbles, and ranch drizzle.', basePrice: 8.49, tag: null, calories: '380 Cal/serving', emoji: '🥔', customizable: false },
  { id: 'philly-tots', category: 'loaded-tots', name: 'Philly Steak Tots', description: 'Tots loaded with seasoned steak, onions, peppers, and cheese sauce.', basePrice: 8.49, tag: null, calories: '370 Cal/serving', emoji: '🥔', customizable: false },
  { id: 'bbq-chicken-tots', category: 'loaded-tots', name: 'BBQ Chicken Tots', description: 'Tots topped with BBQ chicken, mozzarella, red onions, and cilantro.', basePrice: 8.49, tag: 'NEW!', calories: '360 Cal/serving', emoji: '🥔', customizable: false },
  { id: 'chili-cheese-tots', category: 'loaded-tots', name: 'Chili Cheese Tots', description: 'Crispy tots covered in seasoned beef chili and nacho cheese sauce.', basePrice: 7.99, tag: null, calories: '400 Cal/serving', emoji: '🥔', customizable: false },

  // ── Chicken ──
  { id: 'wings-8pc', category: 'chicken', name: '8pc Chicken Wings', description: 'Crispy, juicy chicken wings with your choice of sauce.', basePrice: 9.99, tag: null, calories: '80 Cal/wing', emoji: '🍗', customizable: false },
  { id: 'wings-14pc', category: 'chicken', name: '14pc Chicken Wings', description: 'Party-size crispy wings with your choice of sauce.', basePrice: 15.99, tag: null, calories: '80 Cal/wing', emoji: '🍗', customizable: false },
  { id: 'chicken-tenders', category: 'chicken', name: 'Chicken Tenders', description: 'Hand-breaded chicken tenders served with dipping sauce. 5 per order.', basePrice: 8.49, tag: null, calories: '130 Cal/tender', emoji: '🍗', customizable: false },
  { id: 'chicken-habanero', category: 'chicken', name: 'Habanero Chicken Bites', description: 'Boneless chicken bites tossed in a spicy sweet habanero glaze.', basePrice: 9.49, tag: 'NEW!', calories: '65 Cal/piece', emoji: '🌶️', customizable: false },

  // ── Desserts ──
  { id: 'lava-cakes', category: 'desserts', name: 'Chocolate Lava Crunch Cakes', description: 'Oven-baked chocolate cakes with a molten chocolate center. 2 per order.', basePrice: 6.99, tag: null, calories: '350 Cal/cake', emoji: '🍫', customizable: false },
  { id: 'cookie-brownie', category: 'desserts', name: 'Marbled Cookie Brownie', description: 'A decadent brownie swirled with cookie dough, baked to perfection. Serves 6.', basePrice: 7.99, tag: 'TRENDING', calories: '210 Cal/slice', emoji: '🍪', customizable: false },
  { id: 'churro-bites', category: 'desserts', name: 'Churro Bites', description: 'Warm, sugar-coated churro bites with chocolate dipping sauce. 10 per order.', basePrice: 5.99, tag: 'NEW!', calories: '45 Cal/piece', emoji: '🍩', customizable: false },
  { id: 'funnel-cake', category: 'desserts', name: 'Mini Funnel Cakes', description: 'Crispy funnel cake sticks dusted with powdered sugar. Served with chocolate sauce.', basePrice: 6.49, tag: null, calories: '280 Cal/serving', emoji: '🎪', customizable: false },
  { id: 'cinnamon-pull-aparts', category: 'desserts', name: 'Cinnamon Pull-Aparts', description: 'Warm pull-apart bread pieces tossed in cinnamon sugar with sweet vanilla icing.', basePrice: 6.99, tag: null, calories: '160 Cal/piece', emoji: '🥐', customizable: false },

  // ── Oven-Baked Pastas ──
  { id: 'chicken-alfredo', category: 'pastas', name: 'Chicken Alfredo', description: 'Penne pasta in a rich Alfredo sauce with grilled chicken, baked to bubbly perfection.', basePrice: 9.99, tag: null, calories: '620 Cal', emoji: '🍝', customizable: false },
  { id: 'sausage-marinara', category: 'pastas', name: 'Italian Sausage Marinara', description: 'Penne pasta with Italian sausage in a savory marinara sauce, topped with provolone.', basePrice: 9.99, tag: null, calories: '590 Cal', emoji: '🍝', customizable: false },
  { id: 'chicken-carbonara', category: 'pastas', name: 'Chicken Carbonara', description: 'Penne with grilled chicken, smoked bacon, and onions in a creamy Alfredo sauce.', basePrice: 10.49, tag: 'TRENDING', calories: '650 Cal', emoji: '🍝', customizable: false },
  { id: 'mac-cheese', category: 'pastas', name: '5-Cheese Mac & Cheese', description: 'Creamy mac & cheese made with five real cheeses, oven-baked to perfection.', basePrice: 7.99, tag: null, calories: '540 Cal', emoji: '🧀', customizable: false },
  { id: 'pasta-primavera', category: 'pastas', name: 'Pasta Primavera', description: 'Penne with mushrooms, onions, green peppers, tomatoes, and Alfredo sauce.', basePrice: 9.49, tag: null, calories: '520 Cal', emoji: '🍝', customizable: false },
  { id: 'baked-ziti', category: 'pastas', name: 'Baked Ziti', description: 'Ziti in a hearty marinara with Italian sausage, ricotta, mozzarella, and provolone.', basePrice: 9.99, tag: null, calories: '610 Cal', emoji: '🍝', customizable: false },

  // ── Oven-Baked Sandwiches ──
  { id: 'italian-sub', category: 'sandwiches', name: 'Italian', description: 'Salami, ham, pepperoni, provolone, banana peppers, onions, and Italian dressing on artisan bread.', basePrice: 8.99, tag: null, calories: '680 Cal', emoji: '🥪', customizable: false },
  { id: 'chicken-parm-sub', category: 'sandwiches', name: 'Chicken Parm', description: 'Breaded chicken, marinara sauce, mozzarella, and provolone on oven-baked artisan bread.', basePrice: 8.99, tag: 'TRENDING', calories: '710 Cal', emoji: '🥪', customizable: false },
  { id: 'meatball-sub', category: 'sandwiches', name: 'Meatball', description: 'Seasoned meatballs with marinara and melted provolone on artisan bread.', basePrice: 8.49, tag: null, calories: '740 Cal', emoji: '🥪', customizable: false },
  { id: 'buffalo-chicken-sub', category: 'sandwiches', name: 'Buffalo Chicken', description: 'Crispy chicken breast, hot sauce, blue cheese crumbles, and onions on artisan bread.', basePrice: 8.99, tag: null, calories: '650 Cal', emoji: '🥪', customizable: false },
  { id: 'philly-sub', category: 'sandwiches', name: 'Philly Cheese Steak', description: 'Seasoned steak, onions, green peppers, mushrooms, and provolone on artisan bread.', basePrice: 9.49, tag: null, calories: '690 Cal', emoji: '🥪', customizable: false },
  { id: 'mediterranean-veggie-sub', category: 'sandwiches', name: 'Mediterranean Veggie', description: 'Roasted red peppers, banana peppers, diced tomatoes, spinach, feta, and American cheese.', basePrice: 8.49, tag: 'NEW!', calories: '530 Cal', emoji: '🥪', customizable: false },

  // ── Salads ──
  { id: 'classic-garden', category: 'salads', name: 'Classic Garden', description: 'Fresh lettuce, tomatoes, carrots, red cabbage, and cucumbers with your choice of dressing.', basePrice: 7.99, tag: null, calories: '160 Cal', emoji: '🥗', customizable: false },
  { id: 'caesar-salad', category: 'salads', name: 'Caesar', description: 'Crisp romaine, croutons, and parmesan tossed in creamy Caesar dressing.', basePrice: 7.99, tag: null, calories: '220 Cal', emoji: '🥗', customizable: false },
  { id: 'chicken-caesar', category: 'salads', name: 'Chicken Caesar', description: 'Romaine, grilled chicken, croutons, and parmesan with Caesar dressing.', basePrice: 9.99, tag: 'TRENDING', calories: '360 Cal', emoji: '🥗', customizable: false },
  { id: 'italian-chef', category: 'salads', name: 'Italian Chef', description: 'Lettuce, ham, salami, provolone, tomatoes, onions, and croutons with Italian dressing.', basePrice: 9.49, tag: null, calories: '340 Cal', emoji: '🥗', customizable: false },
  { id: 'greek-salad', category: 'salads', name: 'Greek', description: 'Romaine, feta, black olives, tomatoes, red onions, and banana peppers with Greek dressing.', basePrice: 8.99, tag: null, calories: '280 Cal', emoji: '🥗', customizable: false },
  { id: 'antipasto', category: 'salads', name: 'Antipasto', description: 'Lettuce, salami, ham, pepperoni, banana peppers, tomatoes, black olives, mozzarella, and Italian dressing.', basePrice: 9.99, tag: null, calories: '380 Cal', emoji: '🥗', customizable: false },

  // ── Drinks ──
  { id: 'coca-cola', category: 'drinks', name: 'Coca-Cola®', description: 'Ice-cold 20 oz bottle of classic Coca-Cola.', basePrice: 2.49, tag: null, calories: '240 Cal', emoji: '🥤', customizable: false },
  { id: 'diet-coke', category: 'drinks', name: 'Diet Coke®', description: '20 oz bottle of Diet Coke.', basePrice: 2.49, tag: null, calories: '0 Cal', emoji: '🥤', customizable: false },
  { id: 'sprite', category: 'drinks', name: 'Sprite®', description: '20 oz bottle of Sprite.', basePrice: 2.49, tag: null, calories: '230 Cal', emoji: '🥤', customizable: false },
  { id: 'dr-pepper', category: 'drinks', name: 'Dr Pepper®', description: '20 oz bottle of Dr Pepper.', basePrice: 2.49, tag: null, calories: '250 Cal', emoji: '🥤', customizable: false },
  { id: 'lemonade', category: 'drinks', name: 'Lemonade', description: 'Freshly made lemonade — sweet, tart, and refreshing. 20 oz.', basePrice: 2.99, tag: null, calories: '180 Cal', emoji: '🍋', customizable: false },
  { id: 'bottled-water', category: 'drinks', name: 'Bottled Water', description: '20 oz bottle of purified water.', basePrice: 1.99, tag: null, calories: '0 Cal', emoji: '💧', customizable: false },
  { id: 'orange-fanta', category: 'drinks', name: 'Orange Fanta®', description: '20 oz bottle of Orange Fanta.', basePrice: 2.49, tag: null, calories: '260 Cal', emoji: '🍊', customizable: false },
  { id: '2-liter-coke', category: 'drinks', name: '2-Liter Coca-Cola®', description: 'Large 2-liter bottle of Coca-Cola. Perfect for sharing.', basePrice: 3.99, tag: null, calories: '240 Cal/serving', emoji: '🥤', customizable: false },

  // ── Extras ──
  { id: 'ranch-cup', category: 'extras', name: 'Ranch Dipping Cup', description: 'Creamy ranch dressing dipping cup.', basePrice: 0.99, tag: null, calories: '200 Cal', emoji: '🥛', customizable: false },
  { id: 'blue-cheese-cup', category: 'extras', name: 'Blue Cheese Dipping Cup', description: 'Rich blue cheese dressing dipping cup.', basePrice: 0.99, tag: null, calories: '210 Cal', emoji: '🥛', customizable: false },
  { id: 'garlic-sauce', category: 'extras', name: 'Garlic Dipping Sauce', description: 'Buttery garlic dipping sauce. A Checkers classic.', basePrice: 0.99, tag: null, calories: '250 Cal', emoji: '🧄', customizable: false },
  { id: 'marinara-cup', category: 'extras', name: 'Marinara Dipping Sauce', description: 'Classic marinara sauce for dipping breadsticks and pizza.', basePrice: 0.99, tag: null, calories: '25 Cal', emoji: '🍅', customizable: false },
  { id: 'hot-sauce-cup', category: 'extras', name: 'Hot Buffalo Sauce', description: 'Fiery buffalo sauce dipping cup.', basePrice: 0.99, tag: null, calories: '15 Cal', emoji: '🌶️', customizable: false },
  { id: 'ketchup', category: 'extras', name: 'Ketchup', description: 'Classic tomato ketchup packets. 3 per order.', basePrice: 0.00, tag: null, calories: '10 Cal/pkt', emoji: '🍅', customizable: false },
  { id: 'parmesan-packets', category: 'extras', name: 'Parmesan Cheese Packets', description: 'Grated parmesan cheese packets. 3 per order.', basePrice: 0.00, tag: null, calories: '20 Cal/pkt', emoji: '🧀', customizable: false },
  { id: 'red-pepper-flakes', category: 'extras', name: 'Red Pepper Flakes', description: 'Crushed red pepper flake packets. 3 per order.', basePrice: 0.00, tag: null, calories: '5 Cal/pkt', emoji: '🌶️', customizable: false }
];

// Helper: get products for a category
function getProductsByCategory(categoryId) {
  return PRODUCTS.filter(p => p.category === categoryId);
}

// Helper: get a single product by ID
function getProductById(productId) {
  return PRODUCTS.find(p => p.id === productId);
}

// ============ PIZZA CUSTOMIZATION OPTIONS ============

const SIZES = [
  { id: 'small', name: 'Small 10"', priceModifier: -3.00 },
  { id: 'medium', name: 'Medium 12"', priceModifier: 0 },
  { id: 'large', name: 'Large 14"', priceModifier: 4.00 }
];

const CRUSTS = [
  { id: 'hand-tossed', name: 'Hand Tossed', priceModifier: 0, image: 'images/crusts/hand-tossed.jpg', default: true },
  { id: 'handmade-pan', name: 'Handmade Pan', priceModifier: 1.00, image: 'images/crusts/handmade-pan.jpg', default: false },
  { id: 'thin', name: 'Crunchy Thin', priceModifier: 0, image: 'images/crusts/thin.jpg', default: false },
  { id: 'brooklyn', name: 'Brooklyn Style', priceModifier: 0, image: 'images/crusts/brooklyn.jpg', default: false }
];

const TOPPINGS = [
  { id: 'pepperoni', name: 'Pepperoni', price: 1.50 },
  { id: 'italian-sausage', name: 'Italian Sausage', price: 1.50 },
  { id: 'beef', name: 'Beef', price: 1.50 },
  { id: 'ham', name: 'Ham', price: 1.50 },
  { id: 'bacon', name: 'Bacon', price: 1.50 },
  { id: 'chicken', name: 'Chicken', price: 1.50 },
  { id: 'mushrooms', name: 'Mushrooms', price: 1.50 },
  { id: 'onions', name: 'Onions', price: 1.50 },
  { id: 'green-peppers', name: 'Green Peppers', price: 1.50 },
  { id: 'black-olives', name: 'Black Olives', price: 1.50 },
  { id: 'jalapenos', name: 'Jalapeños', price: 1.50 },
  { id: 'pineapple', name: 'Pineapple', price: 1.50 },
  { id: 'tomatoes', name: 'Tomatoes', price: 1.50 }
];

// ============ PRICING CONSTANTS ============

const DELIVERY_FEE = 5.99;
const TAX_RATE = 0.095;
