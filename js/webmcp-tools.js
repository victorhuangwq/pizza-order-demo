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

      const lines = [];

      // Store info
      lines.push(`# ${STORE.name}`);
      lines.push('');
      lines.push(`- **Address:** ${STORE.address}, ${STORE.city}, ${STORE.state} ${STORE.zip}`);
      lines.push(`- **Phone:** ${STORE.phone}`);
      lines.push(`- **Delivery Estimate:** ${STORE.deliveryEstimate}`);
      lines.push(`- **Hours:**`);
      lines.push(`  - Carryout: Sun–Thu ${STORE.hours.carryout.sunThu}, Fri–Sat ${STORE.hours.carryout.friSat}`);
      lines.push(`  - Delivery: Sun–Thu ${STORE.hours.delivery.sunThu}, Fri–Sat ${STORE.hours.delivery.friSat}`);
      lines.push('');
      lines.push('---');
      lines.push('');
      lines.push('## Menu');

      // Products grouped by category
      const categoryMap = {};
      for (const p of PRODUCTS) {
        if (!categoryMap[p.category]) categoryMap[p.category] = [];
        categoryMap[p.category].push(p);
      }

      for (const cat of CATEGORIES) {
        const items = categoryMap[cat.id];
        if (!items || items.length === 0) continue;

        lines.push('');
        lines.push(`### ${cat.name}`);
        lines.push('');

        for (const p of items) {
          const tag = p.tag ? ` \`${p.tag}\`` : '';
          const emoji = p.emoji ? `${p.emoji} ` : '';
          lines.push(`- ${emoji}**${p.name}**${tag}`);
          lines.push(`  - *${p.description}*`);
          lines.push(`  - **ID:** \`${p.id}\``);
          lines.push(`  - **Base Price:** $${p.basePrice.toFixed(2)}`);
          lines.push(`  - **Calories:** ${p.calories}`);
          lines.push(`  - **Customizable:** ${p.customizable ? 'Yes' : 'No'}`);
          if (p.customizable) {
            const defaults = p.defaultToppings || [];
            lines.push(`  - **Default Toppings:** ${defaults.length > 0 ? defaults.join(', ') : 'None'}`);
          }
        }
      }

      // Customization options
      lines.push('');
      lines.push('---');
      lines.push('');
      lines.push('## Customization Options');
      lines.push('');
      lines.push('### Sizes');
      for (const s of SIZES) {
        const mod = s.priceModifier === 0 ? '$0.00'
          : (s.priceModifier > 0 ? `+$${s.priceModifier.toFixed(2)}` : `−$${Math.abs(s.priceModifier).toFixed(2)}`);
        lines.push(`- **${s.name}** — ${mod}`);
      }
      lines.push('');
      lines.push('### Crusts');
      for (const c of CRUSTS) {
        const mod = c.priceModifier === 0 ? '$0.00' : `+$${c.priceModifier.toFixed(2)}`;
        const def = c.default ? ' *(default)*' : '';
        lines.push(`- **${c.name}** — ${mod}${def}`);
      }
      lines.push('');
      lines.push('### Toppings ($1.50 each beyond defaults)');
      for (const t of TOPPINGS) {
        lines.push(`- ${t.name}`);
      }

      return lines.join('\n');
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
        return 'Error: Delivery address is required for delivery orders.';
      }

      if (!items || items.length === 0) {
        return 'Error: At least one item is required.';
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
        return `Error: ${errors.join(' ')}`;
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
      const lines = [];

      lines.push(`# Order Created`);
      lines.push('');
      lines.push(`- **Type:** ${orderType}`);
      if (address) lines.push(`- **Delivery Address:** ${address}`);
      lines.push('');
      lines.push('## Items');
      lines.push('');
      for (const s of addedItems) {
        lines.push(`- ${s}`);
      }
      lines.push('');
      lines.push('## Totals');
      lines.push('');
      lines.push(`- **Subtotal:** $${totals.subtotal.toFixed(2)}`);
      if (totals.deliveryFee > 0) lines.push(`- **Delivery Fee:** $${totals.deliveryFee.toFixed(2)}`);
      lines.push(`- **Tax:** $${totals.tax.toFixed(2)}`);
      lines.push(`- **Total:** $${totals.total.toFixed(2)}`);
      lines.push('');
      lines.push('---');
      lines.push('');
      lines.push('Ready for checkout. Use the **checkout** tool to complete the order.');

      return lines.join('\n');
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
        return 'Error: Cart is empty. Call create-order first.';
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
