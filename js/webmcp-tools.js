// webmcp-tools.js — WebMCP tool definitions for Checkers Pizza
// Exposes three agentic tools: browse, create-order, checkout.
// These are always registered — no per-step swapping needed.

// ============ TOOL: browse ============

function createBrowseTool() {
  return {
    name: 'browse',
    description: `Begin an ordering session on behalf of the user. Shows a status indicator so the human knows an agent is working, then returns the full Checkers Pizza menu as structured JSON.

Includes:
• Store information (location, hours, delivery estimate)
• All products organized by category, with IDs, descriptions, pricing, and calorie info
• Customizable products (pizzas) include defaultToppings — the toppings that come standard
• Size, crust, and topping options with price modifiers (apply only to customizable products)

PRICING RULES:
• Customizable products (pizzas): price = basePrice + size modifier + crust modifier + (extra toppings beyond defaults × $1.50 each)
  - Sizes: small (-$3.00), medium ($0), large (+$4.00)
  - Crusts: hand-tossed ($0), handmade-pan (+$1.00), thin ($0), brooklyn ($0)
  - Extra toppings: $1.50 each beyond the pizza's default toppings
• Non-customizable products: price = basePrice
• Delivery fee: $5.99 (delivery orders only)
• Tax: 9.5% on subtotal + delivery fee

Use the product IDs from this response when calling create-order.`,
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Display name of the client agent (shown to the user while the order is being prepared).'
        }
      },
      required: ['name']
    },
    execute({ name }) {
      showAgentModal(name);
      const menu = {
        store: STORE,
        products: PRODUCTS.map(p => {
          const item = {
            id: p.id,
            category: p.category,
            name: p.name,
            description: p.description,
            basePrice: p.basePrice,
            calories: p.calories,
            customizable: p.customizable
          };
          if (p.tag) item.tag = p.tag;
          if (p.customizable) item.defaultToppings = p.defaultToppings || [];
          return item;
        }),
        customizationOptions: {
          sizes: SIZES.map(s => ({ id: s.id, name: s.name, priceModifier: s.priceModifier })),
          crusts: CRUSTS.map(c => ({ id: c.id, name: c.name, priceModifier: c.priceModifier, default: c.default })),
          toppings: TOPPINGS.map(t => ({ id: t.id, name: t.name, price: t.price }))
        }
      };

      return {
        content: [{ type: 'text', text: JSON.stringify(menu, null, 2) }]
      };
    }
  };
}

// ============ TOOL: create-order ============

function createCreateOrderTool() {
  return {
    name: 'create-order',
    description: `Create a new order with the specified items in a single call.

Accepts an order type, delivery address, and an array of items to add to the cart. Each item references a product ID from the menu (call browse first to see available IDs).

For customizable products (pizzas), you can optionally specify size, crust, and toppings. Omitted fields use defaults (medium, hand-tossed, the pizza's default toppings).

For non-customizable products (sides, drinks, etc.), only productId and quantity are needed.

This tool resets any existing order state and builds a fresh cart. The UI will update to show the populated cart.`,
    inputSchema: {
      type: 'object',
      properties: {
        orderType: {
          type: 'string',
          enum: ['delivery', 'carryout'],
          description: 'Delivery or carryout.'
        },
        address: {
          type: 'string',
          description: 'Delivery address (required for delivery orders).'
        },
        items: {
          type: 'array',
          description: 'Array of items to add to the cart.',
          items: {
            type: 'object',
            properties: {
              productId: {
                type: 'string',
                description: 'Product ID from the menu (e.g. "pepperoni", "wings-8pc", "coca-cola").'
              },
              quantity: {
                type: 'integer',
                minimum: 1,
                description: 'How many of this item. Default: 1.'
              },
              size: {
                type: 'string',
                enum: ['small', 'medium', 'large'],
                description: 'Size for customizable products. Default: medium.'
              },
              crust: {
                type: 'string',
                enum: ['hand-tossed', 'handmade-pan', 'thin', 'brooklyn'],
                description: 'Crust for customizable products. Default: hand-tossed.'
              },
              toppings: {
                type: 'array',
                items: { type: 'string' },
                description: 'Topping IDs for customizable products. Replaces default toppings. Omit to keep defaults.'
              }
            },
            required: ['productId']
          }
        }
      },
      required: ['orderType', 'items']
    },
    execute({ orderType, address, items }) {
      // Validate order type
      if (orderType === 'delivery' && !address) {
        return { content: [{ type: 'text', text: 'Error: Delivery address is required for delivery orders.' }] };
      }

      if (!items || items.length === 0) {
        return { content: [{ type: 'text', text: 'Error: At least one item is required.' }] };
      }

      // Validate all products exist before mutating state
      const errors = [];
      const resolvedItems = items.map((item, i) => {
        const product = getProductById(item.productId);
        if (!product) {
          errors.push(`Item ${i}: product "${item.productId}" not found.`);
          return null;
        }
        return { ...item, product };
      });

      if (errors.length > 0) {
        return { content: [{ type: 'text', text: `Error: ${errors.join(' ')}` }] };
      }

      // Reset order state
      startNewOrder();

      // Set order type and address
      selectOrderType(orderType);
      if (address) {
        setDeliveryAddress(address);
      }
      confirmLocation('now');

      // Add each item to the cart
      const addedItems = [];

      for (const item of resolvedItems) {
        const product = item.product;
        const qty = item.quantity || 1;

        if (product.customizable) {
          // Build a customized pizza cart entry directly
          const size = item.size || 'medium';
          const crust = item.crust || 'hand-tossed';
          const toppings = item.toppings !== undefined ? item.toppings : [...(product.defaultToppings || [])];

          const sizeObj = SIZES.find(s => s.id === size) || SIZES[1];
          const crustObj = CRUSTS.find(c => c.id === crust) || CRUSTS[0];

          let unitPrice = product.basePrice;
          unitPrice += sizeObj.priceModifier;
          unitPrice += crustObj.priceModifier;

          const defaults = product.defaultToppings || [];
          const extraToppings = toppings.filter(t => !defaults.includes(t));
          unitPrice += extraToppings.length * 1.50;

          orderState.cart.push({
            product: product,
            size: size,
            sizeName: sizeObj.name,
            crust: crust,
            crustName: crustObj.name,
            toppings: [...toppings],
            quantity: qty,
            unitPrice: unitPrice,
            price: unitPrice * qty,
            name: `${sizeObj.name} ${crustObj.name} ${product.name}`,
            calories: product.calories
          });

          addedItems.push(`${qty}x ${sizeObj.name} ${crustObj.name} ${product.name} — $${(unitPrice * qty).toFixed(2)}`);
        } else {
          // Simple product
          const existing = orderState.cart.find(ci => ci.product.id === product.id && !ci.size);
          if (existing) {
            existing.quantity += qty;
            existing.price = existing.unitPrice * existing.quantity;
          } else {
            orderState.cart.push({
              product: product,
              quantity: qty,
              unitPrice: product.basePrice,
              price: product.basePrice * qty,
              name: product.name,
              calories: product.calories || ''
            });
          }
          addedItems.push(`${qty}x ${product.name} — $${(product.basePrice * qty).toFixed(2)}`);
        }
      }

      // Clear agent modal and navigate to checkout
      hideAgentModal();
      goToStep(7);

      const totals = calculateTotals();
      const summary = [
        `Order created (${orderType}${address ? ` to ${address}` : ''}).`,
        ``,
        `Items:`,
        ...addedItems.map(s => `  • ${s}`),
        ``,
        `Subtotal: $${totals.subtotal.toFixed(2)}`,
        totals.deliveryFee > 0 ? `Delivery Fee: $${totals.deliveryFee.toFixed(2)}` : null,
        `Tax: $${totals.tax.toFixed(2)}`,
        `Total: $${totals.total.toFixed(2)}`,
        ``,
        `Ready for checkout. Use the checkout tool to complete the order.`
      ].filter(Boolean).join('\n');

      return {
        content: [{ type: 'text', text: summary }],
        orderState: {
          orderType,
          address,
          cart: orderState.cart.map(ci => ({ name: ci.name, quantity: ci.quantity, price: ci.price })),
          totals
        }
      };
    }
  };
}

// ============ TOOL: checkout ============

function createCheckoutTool() {
  return {
    name: 'checkout',
    description: `Complete the order by providing customer contact info and delivery preferences.

PREREQUISITE: Call create-order first to populate the cart.

The system will prompt the user for confirmation via a browser dialog before finalizing the order.`,
    inputSchema: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          description: 'Customer first name.'
        },
        lastName: {
          type: 'string',
          description: 'Customer last name.'
        },
        phone: {
          type: 'string',
          description: 'Phone number (10 digits).'
        },
        email: {
          type: 'string',
          description: 'Email address for order confirmation.'
        },
        leaveAtDoor: {
          type: 'boolean',
          description: 'Leave order at door without contact. Default: false.'
        },
        deliveryInstructions: {
          type: 'string',
          description: 'Special delivery instructions (e.g. "Gate code: 1234"). Optional.'
        }
      },
      required: ['firstName', 'lastName', 'phone', 'email']
    },
    async execute(params, agent) {
      if (orderState.cart.length === 0) {
        return { content: [{ type: 'text', text: 'Error: Cart is empty. Call create-order first.' }] };
      }

      // Navigate to checkout and set info
      proceedToCheckout();
      const infoResult = setCheckoutInfo(params);

      // If setCheckoutInfo returned a validation error, surface it
      if (infoResult.content && infoResult.content[0] && infoResult.content[0].text.startsWith('Validation')) {
        return infoResult;
      }

      // Place the order (may prompt user for confirmation)
      return placeOrder(params, agent);
    }
  };
}

// ============ REGISTRATION ============

function registerToolsForStep(step) {
  if (!('modelContext' in navigator)) return;

  // browse and create-order are always available.
  // checkout is only offered once the cart is populated and we're at checkout.
  const tools = [
    createBrowseTool(),
    createCreateOrderTool()
  ];

  if (step >= 7 && orderState.cart.length > 0) {
    tools.push(createCheckoutTool());
  }

  navigator.modelContext.provideContext({ tools });
}
