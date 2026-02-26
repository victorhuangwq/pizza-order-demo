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

This tool resets any existing order state and builds a fresh cart. The UI will update to show the populated cart.

Returns the cart state with unique IDs for each item. Use these IDs with update-order to modify the order.`,
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
      for (let i = 0; i < items.length; i++) {
        const product = getProductById(items[i].productId);
        if (!product) {
          errors.push(`Item ${i}: product "${items[i].productId}" not found.`);
        }
      }

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
      for (const item of items) {
        addItemToCartFromSpec(item);
      }

      // Clear agent modal and navigate to checkout
      hideAgentModal();
      goToStep(7);

      const lines = [];
      lines.push('# Order Created');
      lines.push('');
      lines.push(`- **Type:** ${orderType}`);
      if (address) lines.push(`- **Delivery Address:** ${address}`);
      lines.push('');
      lines.push(generateCartMarkdown());
      lines.push('');
      lines.push('---');
      lines.push('');
      lines.push('Ready for checkout. Use **update-order** to modify or **checkout** to complete the order.');

      return lines.join('\n');
    }
  };
}

// ============ TOOL: update-order ============

function createUpdateOrderTool() {
  return {
    name: 'update-order',
    description: `Modify an existing order by adding new products, removing products, or changing quantities.

Use the cart IDs returned by create-order or a previous update-order call to reference items. Each cart item has a unique 8-character hex ID.

All fields are optional — include only the changes you need to make. Operations are applied in order: removals first, then quantity changes, then additions.`,
    inputSchema: {
      type: 'object',
      properties: {
        add: {
          type: 'array',
          description: 'New products to add to the cart.',
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
        },
        remove: {
          type: 'array',
          description: 'Cart IDs of items to remove.',
          items: { type: 'string' }
        },
        changeQuantity: {
          type: 'array',
          description: 'Change quantity for existing cart items.',
          items: {
            type: 'object',
            properties: {
              cartId: {
                type: 'string',
                description: 'The 8-character hex cart ID of the item to update.'
              },
              quantity: {
                type: 'integer',
                minimum: 1,
                description: 'New quantity for the item.'
              }
            },
            required: ['cartId', 'quantity']
          }
        }
      }
    },
    execute({ add, remove, changeQuantity }) {
      if (orderState.cart.length === 0 && (!add || add.length === 0)) {
        return 'Error: Cart is empty and no items to add. Use create-order to build an order first.';
      }

      const changes = [];
      const errors = [];

      // 1. Remove items
      if (remove && remove.length > 0) {
        for (const cartId of remove) {
          const idx = orderState.cart.findIndex(item => item.cartId === cartId);
          if (idx === -1) {
            errors.push(`Cart ID "${cartId}" not found.`);
          } else {
            const item = orderState.cart[idx];
            changes.push(`Removed ${item.name} (\`${cartId}\`)`);
            orderState.cart.splice(idx, 1);
          }
        }
      }

      // 2. Change quantities
      if (changeQuantity && changeQuantity.length > 0) {
        for (const { cartId, quantity } of changeQuantity) {
          const item = orderState.cart.find(i => i.cartId === cartId);
          if (!item) {
            errors.push(`Cart ID "${cartId}" not found.`);
          } else {
            const oldQty = item.quantity;
            item.quantity = quantity;
            item.price = item.unitPrice * quantity;
            changes.push(`Changed ${item.name} (\`${cartId}\`) quantity: ${oldQty} → ${quantity}`);
          }
        }
      }

      // 3. Add new items
      if (add && add.length > 0) {
        // Validate all products first
        const addErrors = [];
        for (let i = 0; i < add.length; i++) {
          if (!getProductById(add[i].productId)) {
            addErrors.push(`Product "${add[i].productId}" not found.`);
          }
        }
        if (addErrors.length > 0) {
          errors.push(...addErrors);
        } else {
          for (const itemSpec of add) {
            const result = addItemToCartFromSpec(itemSpec);
            if (result.success) {
              changes.push(`Added ${result.description} (\`${result.cartId}\`)`);
            } else {
              errors.push(result.error);
            }
          }
        }
      }

      // Re-render cart
      renderCart();
      updateCartBadge();

      const lines = [];
      lines.push('# Order Updated');
      lines.push('');

      if (errors.length > 0) {
        lines.push('## Errors');
        lines.push('');
        for (const e of errors) {
          lines.push(`- ${e}`);
        }
        lines.push('');
      }

      if (changes.length > 0) {
        lines.push('## Changes');
        lines.push('');
        for (const c of changes) {
          lines.push(`- ${c}`);
        }
        lines.push('');
      }

      lines.push(generateCartMarkdown());
      lines.push('');
      lines.push('---');
      lines.push('');
      lines.push('Use **update-order** to make more changes or **checkout** to complete.');

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
  // update-order is available once the cart is populated.
  // checkout is only offered once the cart is populated and we're at checkout.
  const tools = [
    createBrowseTool(),
    createCreateOrderTool()
  ];

  if (orderState.cart.length > 0) {
    tools.push(createUpdateOrderTool());
  }

  if (step >= 7 && orderState.cart.length > 0) {
    tools.push(createCheckoutTool());
  }

  navigator.modelContext.provideContext({ tools });
}
