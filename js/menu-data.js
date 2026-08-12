// menu-data.js - Mock catalog for Contoso Pizza

const STORE = {
  id: 'seattle-01',
  name: 'Contoso Pizza - Seattle',
  address: '4123 Main Street',
  city: 'Seattle',
  state: 'WA',
  zip: '98052',
  phone: '(425) 555-0117',
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
  { id: 'potato-sides', name: 'Potato Sides', badge: null },
  { id: 'chicken', name: 'Chicken', badge: null },
  { id: 'desserts', name: 'Desserts', badge: 'NEW!' },
  { id: 'pastas', name: 'Pastas', badge: null },
  { id: 'sandwiches', name: 'Sandwiches', badge: null },
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
  { id: 'cheese', category: 'build-your-own', name: 'Cheese', description: 'Mozzarella and house tomato sauce on a classic crust.', basePrice: 11.25, tag: null, defaultToppings: [], calories: '280 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'pepperoni', category: 'build-your-own', name: 'Pepperoni', description: 'Pepperoni and mozzarella with house tomato sauce.', basePrice: 13.25, tag: 'POPULAR', defaultToppings: ['pepperoni'], calories: '310 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'margherita', category: 'build-your-own', name: 'Margherita', description: 'Fresh mozzarella, tomatoes, and basil on a garlic-herb crust.', basePrice: 13.25, tag: null, defaultToppings: ['tomatoes'], calories: '290 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'white-pizza', category: 'build-your-own', name: 'White Pizza', description: 'Creamy Alfredo sauce with garlic, ricotta, mozzarella, and provolone.', basePrice: 13.75, tag: null, defaultToppings: [], calories: '300 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'garlic-lovers', category: 'build-your-own', name: 'Garlic Lovers', description: 'Roasted garlic sauce with mozzarella and a parmesan blend.', basePrice: 12.25, tag: null, defaultToppings: [], calories: '285 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'buffalo-base', category: 'build-your-own', name: 'Buffalo Style', description: 'Spicy buffalo sauce base with mozzarella. Add your favorite toppings!', basePrice: 12.75, tag: 'NEW!', defaultToppings: [], calories: '295 Cal/slice', emoji: '🍕', customizable: true },

  // ── Specialty Pizzas (customizable — signature combos) ──
  { id: 'meat-feast', category: 'specialty', name: 'Meat Feast', description: 'Pepperoni, ham, Italian sausage, beef, and mozzarella.', basePrice: 16.25, tag: null, defaultToppings: ['pepperoni', 'ham', 'italian-sausage', 'beef'], calories: '380 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'loaded-supreme', category: 'specialty', name: 'Loaded Supreme', description: 'Pepperoni, ham, Italian sausage, beef, onions, green peppers, mushrooms, black olives, and mozzarella.', basePrice: 17.25, tag: null, defaultToppings: ['pepperoni', 'ham', 'italian-sausage', 'beef', 'onions', 'green-peppers', 'mushrooms', 'black-olives'], calories: '360 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'veggie', category: 'specialty', name: 'Veggie Supreme', description: 'Mushrooms, green peppers, onions, black olives, tomatoes, mozzarella, and house tomato sauce.', basePrice: 15.25, tag: 'NEW!', defaultToppings: ['mushrooms', 'green-peppers', 'onions', 'black-olives', 'tomatoes'], calories: '270 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'bbq-chicken', category: 'specialty', name: 'BBQ Chicken', description: 'Grilled chicken, BBQ sauce, onions, mozzarella and provolone.', basePrice: 16.25, tag: null, defaultToppings: ['chicken', 'onions'], calories: '320 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'smoky-chicken-jalapeno', category: 'specialty', name: 'Smoky Chicken Jalapeno', description: 'Grilled chicken, smoked bacon, jalapeños, provolone, and mozzarella.', basePrice: 17.25, tag: 'NEW!', defaultToppings: ['chicken', 'bacon', 'jalapenos'], calories: '350 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'ham-pineapple', category: 'specialty', name: 'Ham and Pineapple', description: 'Ham, pineapple, mozzarella, and house tomato sauce.', basePrice: 14.25, tag: null, defaultToppings: ['ham', 'pineapple'], calories: '300 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'supreme', category: 'specialty', name: 'Supreme', description: 'Pepperoni, sausage, green peppers, onions, mushrooms, black olives, and house tomato sauce.', basePrice: 16.75, tag: null, defaultToppings: ['pepperoni', 'italian-sausage', 'green-peppers', 'onions', 'mushrooms', 'black-olives'], calories: '340 Cal/slice', emoji: '🍕', customizable: true },
  { id: 'steak-peppers', category: 'specialty', name: 'Steak and Peppers', description: 'Sliced steak, onions, green peppers, mushrooms, and provolone on garlic cream sauce.', basePrice: 17.25, tag: null, defaultToppings: ['beef', 'onions', 'green-peppers', 'mushrooms'], calories: '370 Cal/slice', emoji: '🍕', customizable: true },

  // ── Breads ──
  { id: 'cheese-filled-breadsticks', category: 'breads', name: 'Cheese-Filled Breadsticks', description: 'Breadsticks filled with cheese and brushed with garlic butter.', basePrice: 8.25, tag: null, calories: '180 Cal/piece', emoji: '🧀', customizable: false },
  { id: 'garlic-breadsticks', category: 'breads', name: 'Garlic Breadsticks', description: 'Warm, soft breadsticks brushed with garlic butter and Italian herbs.', basePrice: 6.25, tag: null, calories: '140 Cal/piece', emoji: '🥖', customizable: false },
  { id: 'cinnamon-twists', category: 'breads', name: 'Cinnamon Twists', description: 'Sweet twists dusted with cinnamon sugar and served with vanilla icing.', basePrice: 6.75, tag: 'NEW!', calories: '190 Cal/piece', emoji: '🥨', customizable: false },
  { id: 'garlic-knots', category: 'breads', name: 'Garlic Knots', description: 'Soft, hand-tied bread knots tossed in garlic butter and parmesan. 8 per order.', basePrice: 6.75, tag: null, calories: '120 Cal/piece', emoji: '🥖', customizable: false },
  { id: 'cheesy-marinara-bread', category: 'breads', name: 'Cheesy Marinara Bread', description: 'Toasted bread topped with marinara, melted mozzarella, and Italian seasonings.', basePrice: 7.75, tag: null, calories: '200 Cal/piece', emoji: '🍞', customizable: false },

  // Potato Sides
  { id: 'cheddar-bacon-potatoes', category: 'potato-sides', name: 'Cheddar Bacon Potatoes', description: 'Crispy potato bites with cheddar, bacon, and ranch.', basePrice: 7.25, tag: null, calories: '320 Cal/serving', emoji: '🥔', customizable: false },
  { id: 'spicy-chicken-potatoes', category: 'potato-sides', name: 'Spicy Chicken Potatoes', description: 'Potato bites with spicy chicken, blue cheese, and ranch.', basePrice: 8.75, tag: null, calories: '380 Cal/serving', emoji: '🥔', customizable: false },
  { id: 'steak-pepper-potatoes', category: 'potato-sides', name: 'Steak and Pepper Potatoes', description: 'Potato bites with seasoned steak, onions, peppers, and cheese sauce.', basePrice: 8.75, tag: null, calories: '370 Cal/serving', emoji: '🥔', customizable: false },
  { id: 'bbq-chicken-potatoes', category: 'potato-sides', name: 'BBQ Chicken Potatoes', description: 'Potato bites with BBQ chicken, mozzarella, red onions, and cilantro.', basePrice: 8.75, tag: 'NEW!', calories: '360 Cal/serving', emoji: '🥔', customizable: false },
  { id: 'chili-cheese-potatoes', category: 'potato-sides', name: 'Chili Cheese Potatoes', description: 'Crispy potato bites with seasoned beef chili and cheese sauce.', basePrice: 8.25, tag: null, calories: '400 Cal/serving', emoji: '🥔', customizable: false },

  // ── Chicken ──
  { id: 'wings-8pc', category: 'chicken', name: '8pc Chicken Wings', description: 'Crispy, juicy chicken wings with your choice of sauce.', basePrice: 10.25, tag: null, calories: '80 Cal/wing', emoji: '🍗', customizable: false },
  { id: 'wings-14pc', category: 'chicken', name: '14pc Chicken Wings', description: 'Party-size crispy wings with your choice of sauce.', basePrice: 16.25, tag: null, calories: '80 Cal/wing', emoji: '🍗', customizable: false },
  { id: 'chicken-tenders', category: 'chicken', name: 'Chicken Tenders', description: 'Hand-breaded chicken tenders served with dipping sauce. 5 per order.', basePrice: 8.75, tag: null, calories: '130 Cal/tender', emoji: '🍗', customizable: false },
  { id: 'sweet-heat-chicken', category: 'chicken', name: 'Sweet Heat Chicken Bites', description: 'Boneless chicken bites tossed in a sweet and spicy glaze.', basePrice: 9.75, tag: 'NEW!', calories: '65 Cal/piece', emoji: '🌶️', customizable: false },

  // ── Desserts ──
  { id: 'chocolate-lava-cakes', category: 'desserts', name: 'Chocolate Lava Cakes', description: 'Chocolate cakes with a warm chocolate center. 2 per order.', basePrice: 7.25, tag: null, calories: '350 Cal/cake', emoji: '🍫', customizable: false },
  { id: 'chocolate-chip-brownie', category: 'desserts', name: 'Chocolate Chip Brownie', description: 'A chocolate brownie topped with chocolate chips. Serves 6.', basePrice: 8.25, tag: 'POPULAR', calories: '210 Cal/slice', emoji: '🍪', customizable: false },
  { id: 'churro-bites', category: 'desserts', name: 'Churro Bites', description: 'Warm, sugar-coated churro bites with chocolate dipping sauce. 10 per order.', basePrice: 6.25, tag: 'NEW!', calories: '45 Cal/piece', emoji: '🍩', customizable: false },
  { id: 'funnel-cake', category: 'desserts', name: 'Mini Funnel Cakes', description: 'Crispy funnel cake sticks dusted with powdered sugar. Served with chocolate sauce.', basePrice: 6.75, tag: null, calories: '280 Cal/serving', emoji: '🎪', customizable: false },
  { id: 'cinnamon-bites', category: 'desserts', name: 'Cinnamon Bites', description: 'Warm bread bites tossed in cinnamon sugar with vanilla icing.', basePrice: 7.25, tag: null, calories: '160 Cal/piece', emoji: '🥐', customizable: false },

  // Pastas
  { id: 'creamy-chicken-penne', category: 'pastas', name: 'Creamy Chicken Penne', description: 'Penne with grilled chicken in a creamy garlic sauce.', basePrice: 10.25, tag: null, calories: '620 Cal', emoji: '🍝', customizable: false },
  { id: 'sausage-tomato-penne', category: 'pastas', name: 'Sausage Tomato Penne', description: 'Penne with Italian sausage, tomato sauce, and provolone.', basePrice: 10.25, tag: null, calories: '590 Cal', emoji: '🍝', customizable: false },
  { id: 'chicken-bacon-penne', category: 'pastas', name: 'Chicken Bacon Penne', description: 'Penne with grilled chicken, smoked bacon, onions, and creamy garlic sauce.', basePrice: 10.75, tag: 'POPULAR', calories: '650 Cal', emoji: '🍝', customizable: false },
  { id: 'mac-cheese', category: 'pastas', name: 'Creamy Mac and Cheese', description: 'Macaroni in a creamy cheese sauce with a toasted topping.', basePrice: 8.25, tag: null, calories: '540 Cal', emoji: '🧀', customizable: false },
  { id: 'garden-vegetable-penne', category: 'pastas', name: 'Garden Vegetable Penne', description: 'Penne with mushrooms, onions, green peppers, tomatoes, and creamy garlic sauce.', basePrice: 9.75, tag: null, calories: '520 Cal', emoji: '🍝', customizable: false },
  { id: 'baked-ziti', category: 'pastas', name: 'Baked Ziti', description: 'Ziti in a hearty marinara with Italian sausage, ricotta, mozzarella, and provolone.', basePrice: 10.25, tag: null, calories: '610 Cal', emoji: '🍝', customizable: false },

  // Sandwiches
  { id: 'deli-trio', category: 'sandwiches', name: 'Deli Trio', description: 'Salami, ham, pepperoni, provolone, banana peppers, onions, and Italian dressing on a toasted roll.', basePrice: 9.25, tag: null, calories: '680 Cal', emoji: '🥪', customizable: false },
  { id: 'crispy-chicken-marinara', category: 'sandwiches', name: 'Crispy Chicken Marinara', description: 'Breaded chicken, marinara sauce, mozzarella, and provolone on a toasted roll.', basePrice: 9.25, tag: 'POPULAR', calories: '710 Cal', emoji: '🥪', customizable: false },
  { id: 'meatball-sub', category: 'sandwiches', name: 'Meatball', description: 'Seasoned meatballs with marinara and melted provolone on a toasted roll.', basePrice: 8.75, tag: null, calories: '740 Cal', emoji: '🥪', customizable: false },
  { id: 'spicy-chicken-sub', category: 'sandwiches', name: 'Spicy Chicken', description: 'Crispy chicken, hot sauce, blue cheese, and onions on a toasted roll.', basePrice: 9.25, tag: null, calories: '650 Cal', emoji: '🥪', customizable: false },
  { id: 'steak-pepper-sub', category: 'sandwiches', name: 'Steak and Pepper', description: 'Seasoned steak, onions, green peppers, mushrooms, and provolone on a toasted roll.', basePrice: 9.75, tag: null, calories: '690 Cal', emoji: '🥪', customizable: false },
  { id: 'roasted-vegetable-sub', category: 'sandwiches', name: 'Roasted Vegetable', description: 'Roasted red peppers, banana peppers, tomatoes, spinach, feta, and mild cheese.', basePrice: 8.75, tag: 'NEW!', calories: '530 Cal', emoji: '🥪', customizable: false },

  // ── Salads ──
  { id: 'garden-salad', category: 'salads', name: 'Garden Salad', description: 'Fresh lettuce, tomatoes, carrots, red cabbage, and cucumbers with your choice of dressing.', basePrice: 8.25, tag: null, calories: '160 Cal', emoji: '🥗', customizable: false },
  { id: 'caesar-salad', category: 'salads', name: 'Caesar', description: 'Crisp romaine, croutons, and parmesan tossed in creamy Caesar dressing.', basePrice: 8.25, tag: null, calories: '220 Cal', emoji: '🥗', customizable: false },
  { id: 'grilled-chicken-caesar', category: 'salads', name: 'Grilled Chicken Caesar', description: 'Romaine, grilled chicken, croutons, and parmesan with Caesar dressing.', basePrice: 10.25, tag: 'POPULAR', calories: '360 Cal', emoji: '🥗', customizable: false },
  { id: 'italian-chef', category: 'salads', name: 'Italian Chef', description: 'Lettuce, ham, salami, provolone, tomatoes, onions, and croutons with Italian dressing.', basePrice: 9.75, tag: null, calories: '340 Cal', emoji: '🥗', customizable: false },
  { id: 'greek-salad', category: 'salads', name: 'Greek', description: 'Romaine, feta, black olives, tomatoes, red onions, and banana peppers with Greek dressing.', basePrice: 9.25, tag: null, calories: '280 Cal', emoji: '🥗', customizable: false },
  { id: 'antipasto', category: 'salads', name: 'Antipasto', description: 'Lettuce, salami, ham, pepperoni, banana peppers, tomatoes, black olives, mozzarella, and Italian dressing.', basePrice: 10.25, tag: null, calories: '380 Cal', emoji: '🥗', customizable: false },

  // ── Drinks ──
  { id: 'cola', category: 'drinks', name: 'Cola', description: '20 oz bottle of cola.', basePrice: 2.75, tag: null, calories: '240 Cal', emoji: '🥤', customizable: false },
  { id: 'diet-cola', category: 'drinks', name: 'Diet Cola', description: '20 oz bottle of diet cola.', basePrice: 2.75, tag: null, calories: '0 Cal', emoji: '🥤', customizable: false },
  { id: 'lemon-lime-soda', category: 'drinks', name: 'Lemon-Lime Soda', description: '20 oz bottle of lemon-lime soda.', basePrice: 2.75, tag: null, calories: '230 Cal', emoji: '🥤', customizable: false },
  { id: 'root-beer', category: 'drinks', name: 'Root Beer', description: '20 oz bottle of root beer.', basePrice: 2.75, tag: null, calories: '250 Cal', emoji: '🥤', customizable: false },
  { id: 'lemonade', category: 'drinks', name: 'Lemonade', description: 'Freshly made lemonade — sweet, tart, and refreshing. 20 oz.', basePrice: 3.25, tag: null, calories: '180 Cal', emoji: '🍋', customizable: false },
  { id: 'bottled-water', category: 'drinks', name: 'Bottled Water', description: '20 oz bottle of purified water.', basePrice: 2.25, tag: null, calories: '0 Cal', emoji: '💧', customizable: false },
  { id: 'orange-soda', category: 'drinks', name: 'Orange Soda', description: '20 oz bottle of orange soda.', basePrice: 2.75, tag: null, calories: '260 Cal', emoji: '🍊', customizable: false },
  { id: 'two-liter-cola', category: 'drinks', name: '2-Liter Cola', description: '2-liter bottle of cola for sharing.', basePrice: 4.25, tag: null, calories: '240 Cal/serving', emoji: '🥤', customizable: false },

  // ── Extras ──
  { id: 'ranch-cup', category: 'extras', name: 'Ranch Dipping Cup', description: 'Creamy ranch dressing dipping cup.', basePrice: 1.25, tag: null, calories: '200 Cal', emoji: '🥛', customizable: false },
  { id: 'blue-cheese-cup', category: 'extras', name: 'Blue Cheese Dipping Cup', description: 'Rich blue cheese dressing dipping cup.', basePrice: 1.25, tag: null, calories: '210 Cal', emoji: '🥛', customizable: false },
  { id: 'garlic-sauce', category: 'extras', name: 'Garlic Dipping Sauce', description: 'Buttery garlic dipping sauce and a house favorite.', basePrice: 1.25, tag: null, calories: '250 Cal', emoji: '🧄', customizable: false },
  { id: 'marinara-cup', category: 'extras', name: 'Marinara Dipping Sauce', description: 'Classic marinara sauce for dipping breadsticks and pizza.', basePrice: 1.25, tag: null, calories: '25 Cal', emoji: '🍅', customizable: false },
  { id: 'hot-sauce-cup', category: 'extras', name: 'Hot Buffalo Sauce', description: 'Fiery buffalo sauce dipping cup.', basePrice: 1.25, tag: null, calories: '15 Cal', emoji: '🌶️', customizable: false },
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
  { id: 'small', name: 'Small 10"', priceModifier: -2.50 },
  { id: 'medium', name: 'Medium 12"', priceModifier: 0 },
  { id: 'large', name: 'Large 14"', priceModifier: 3.50 }
];

const CRUSTS = [
  { id: 'classic', name: 'Classic', priceModifier: 0, image: 'images/crusts/classic.jpg', default: true },
  { id: 'pan', name: 'Pan', priceModifier: 1.25, image: 'images/crusts/pan.jpg', default: false },
  { id: 'thin', name: 'Thin', priceModifier: 0, image: 'images/crusts/thin.jpg', default: false },
  { id: 'stone-baked', name: 'Stone-Baked', priceModifier: 0.75, image: 'images/crusts/stone-baked.jpg', default: false }
];

const TOPPINGS = [
  { id: 'pepperoni', name: 'Pepperoni', price: 1.25 },
  { id: 'italian-sausage', name: 'Italian Sausage', price: 1.25 },
  { id: 'beef', name: 'Beef', price: 1.25 },
  { id: 'ham', name: 'Ham', price: 1.25 },
  { id: 'bacon', name: 'Bacon', price: 1.25 },
  { id: 'chicken', name: 'Chicken', price: 1.25 },
  { id: 'mushrooms', name: 'Mushrooms', price: 1.25 },
  { id: 'onions', name: 'Onions', price: 1.25 },
  { id: 'green-peppers', name: 'Green Peppers', price: 1.25 },
  { id: 'black-olives', name: 'Black Olives', price: 1.25 },
  { id: 'jalapenos', name: 'Jalapeños', price: 1.25 },
  { id: 'pineapple', name: 'Pineapple', price: 1.25 },
  { id: 'tomatoes', name: 'Tomatoes', price: 1.25 }
];

// ============ PRICING CONSTANTS ============

const EXTRA_TOPPING_PRICE = 1.25;
const DELIVERY_FEE = 4.50;
const TAX_RATE = 0.0875;
