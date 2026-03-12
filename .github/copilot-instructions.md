# Copilot Instructions — Checkers Pizza Demo

## Build & Run

```bash
npm install
npm start        # Express server on http://localhost:3000
npm run dev      # Same with --watch for auto-restart
```

No test suite, linter, or build step exists. The app is vanilla HTML/CSS/JS served statically by Express.

## Architecture

This is a **single-page 7-step pizza ordering wizard** for a pizza delivery/carryout site.

### Key files

- **`js/app.js`** — Wizard controller: `orderState` object, step navigation (`goToStep`), all business logic functions (e.g., `selectOrderType`, `setDeliveryAddress`, `addToCart`, `addSimpleProduct`), DOM rendering per step, and price calculation.
- **`js/menu-data.js`** — Unified `PRODUCTS` array (every orderable item with a `customizable` flag and `category`), helper functions `getProductsByCategory()` and `getProductById()`, plus `SIZES`, `CRUSTS`, `TOPPINGS`, and pricing constants (`DELIVERY_FEE`, `TAX_RATE`).
- **`index.html`** — All 7 steps as `<section>` elements, shown/hidden by `goToStep()`.

## Conventions

- **Pricing logic**: Customizable products (pizzas): base price ± size modifier ($-3 small, $0 medium, $+4 large) + crust modifier (handmade-pan +$1) + extra toppings beyond defaults at $1.50 each. Non-customizable products use flat `basePrice`. Delivery fee $5.99, tax 9.5%.
- **Unified product catalog**: All orderable items live in a single `PRODUCTS` array in `menu-data.js`. Products with `customizable: true` (pizzas) support size/crust/topping selection; all others are simple add-to-cart items.
- **Server**: Uses `dotenv` for environment config; `PORT` defaults to `process.env.PORT || 3000`.

## Deployment

Auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`. The entire repo root is deployed as-is (static files).
