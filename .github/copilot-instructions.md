# Copilot Instructions — Checkers Pizza WebMCP Demo

## Build & Run

```bash
npm install
npm start        # Express server on http://localhost:3000
npm run dev      # Same with --watch for auto-restart
```

No test suite, linter, or build step exists. The app is vanilla HTML/CSS/JS served statically by Express.

## Architecture

This is a **single-page 7-step pizza ordering wizard** that demonstrates the [WebMCP API](https://github.com/webmachinelearning/webmcp) — a browser API letting AI agents discover and call tools exposed by web pages.

### Core pattern: agent-optimized flow

`webmcp-tools.js` registers three high-level tools — `browse`, `create-order`, and `checkout` — via `navigator.modelContext.provideContext({ tools })`. `browse` and `create-order` are **always registered**; `checkout` is added once the cart is populated (step ≥ 7).

### Agent modal

The `browse` tool calls `showAgentModal(name)` to display a spinner overlay ("<agent name> is creating your order"), and `create-order` calls `hideAgentModal()` once the cart is built. This gives the user visual feedback that an agent is working.

### Shared execution between UI and agent

UI click handlers and WebMCP tool `execute` callbacks call the **same functions** in `app.js`. For example, both the "DELIVERY" button click and the `select-order-type` tool call `selectOrderType("delivery")`. Never duplicate logic — always route through the shared helpers.

### Key files

- **`js/app.js`** — Wizard controller: `orderState` object, step navigation (`goToStep`), all business logic functions (e.g., `selectOrderType`, `setDeliveryAddress`, `addToCart`, `addSimpleProduct`), DOM rendering per step, price calculation, and agent modal helpers (`showAgentModal`, `hideAgentModal`).
- **`js/webmcp-tools.js`** — Three tool definitions: `browse` (returns full menu), `create-order` (builds a cart in one call), and `checkout` (sets contact info and places order). Each tool's `execute` delegates to corresponding `app.js` functions.
- **`js/menu-data.js`** — Unified `PRODUCTS` array (every orderable item with a `customizable` flag and `category`), helper functions `getProductsByCategory()` and `getProductById()`, plus `SIZES`, `CRUSTS`, `TOPPINGS`, and pricing constants (`DELIVERY_FEE`, `TAX_RATE`).
- **`js/webmcp-shim.js`** — Development polyfill that provides `navigator.modelContext` and a console API (`mcp.help()`, `mcp.call()`) when the real WebMCP API isn't available.
- **`index.html`** — All 7 steps as `<section>` elements, shown/hidden by `goToStep()`.
- **`extension/`** — Separate Chrome extension for inspecting WebMCP tools (has its own `package.json` and `manifest.json`). Not part of the main app.

### Step → Tool mapping

| Tool | Available | Purpose |
|------|-----------|---------|
| `browse` | Always | Returns full menu as JSON; shows agent modal |
| `create-order` | Always | Builds a complete cart (order type, address, items with optional pizza customization) in one call; hides agent modal and navigates to checkout |
| `checkout` | Step ≥ 7, cart non-empty | Sets contact info, prompts user confirmation, places order |

## Conventions

- **Tool responses** always return `{ content: [{ type: "text", text: "..." }] }` with a confirmation of what was done, current state summary, and a hint for next action.
- **Validation errors** are returned as content text (not exceptions): `"Error: Please enter a delivery address."`.
- **`place-order`** uses `agent.requestUserInteraction()` to get explicit user confirmation via a browser `confirm()` dialog before completing.
- **Feature detection**: the site works as a normal ordering site without WebMCP. Tools are only registered when `"modelContext" in navigator` is true.
- **Pricing logic**: Customizable products (pizzas): base price ± size modifier ($-3 small, $0 medium, $+4 large) + crust modifier (handmade-pan +$1) + extra toppings beyond defaults at $1.50 each. Non-customizable products use flat `basePrice`. Delivery fee $5.99, tax 9.5%.
- **Unified product catalog**: All orderable items live in a single `PRODUCTS` array in `menu-data.js`. Products with `customizable: true` (pizzas) support size/crust/topping selection; all others are simple add-to-cart items. The old separate `PIZZAS` and `SIDES` arrays have been removed.
- **Server**: Uses `dotenv` for environment config; `PORT` defaults to `process.env.PORT || 3000`.

## Deployment

Auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`. The entire repo root is deployed as-is (static files).
