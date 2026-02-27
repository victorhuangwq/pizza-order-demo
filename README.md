# Pizza Order Demo (Imperative WebMCP Implementation)

A demo site implementing the [imperative version of WebMCP](https://github.com/webmachinelearning/webmcp), a browser API that enables AI agents to discover and interact with tools exposed by web pages. This example demonstrates a pizza ordering flow where three agentic tools (`browse`, `create-order`, `checkout`) let an AI agent build a complete order in just a few calls.

![Pizza Order Demo](image.png)

## 🚀 Live Demo

**[Try it now on GitHub Pages](https://victorhuangwq.github.io/pizza-order-demo/)**

## How to Test It

To test this demo with a real WebMCP implementation:

### Chrome with Experimental Platform Features (EPP)

1. **Read the setup guide:** [WebMCP Chrome Blog Post](https://developer.chrome.com/blog/webmcp-epp)
2. **Follow the setup steps:** [WebMCP Setup Instructions](https://docs.google.com/document/d/1rtU1fRPS0bMqd9abMG_hc6K9OAI6soUy3Kh00toAgyk/edit?tab=t.0)
3. **Open the live demo** in your configured Chrome browser, with the developer extension installed.
4. The site will automatically register its WebMCP tools (`browse`, `create-order`, `checkout`)

### Browser Compatibility

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome | ✅ Working | Requires EPP setup (see above) |
| Edge | 🔜 Coming Soon | Support in progress |

## How It Works

The site exposes three high-level WebMCP tools via `navigator.modelContext.provideContext({ tools })`. An AI agent can complete an entire order in as few as three tool calls:

| Tool | Purpose |
|------|---------|
| `browse` | Returns the full menu (products, sizes, crusts, toppings, pricing rules) as structured JSON. Shows an agent-working modal to the user. |
| `create-order` | Accepts order type, address, and an array of items (with optional pizza customization). Builds a cart and navigates to checkout in one call. |
| `checkout` | Collects customer contact info, prompts the user for confirmation, and places the order. |

`browse` and `create-order` are always registered. `checkout` becomes available once the cart is populated and the UI reaches the checkout step.

## Local Development

Run the site locally with npm:

```bash
npm install
npm start
```

Then open **http://localhost:3000** in your browser.

## Project Structure

```
.
├── index.html             # Single-page wizard (all 7 steps)
├── css/
│   └── style.css          # Styling
├── js/
│   ├── app.js             # Wizard logic and state management
│   ├── menu-data.js       # Unified product catalog & customization options
│   └── webmcp-tools.js    # WebMCP tool definitions (browse, create-order, checkout)
├── server.js              # Local dev server
└── package.json
```

## For Developers

### Deployment

This site is automatically deployed to GitHub Pages via GitHub Actions whenever changes are pushed to the `main` branch. No manual configuration needed.

To view deployment status:
- Go to [Actions tab](https://github.com/victorhuangwq/pizza-order-demo/actions)
- Check the "Deploy to GitHub Pages" workflow
