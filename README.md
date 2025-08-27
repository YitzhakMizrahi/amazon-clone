### Amazon Clone — Next.js, Redux Toolkit, Stripe, NextAuth, Firebase

Modern e‑commerce clone that demonstrates full‑stack product browsing, cart/checkout flow, payments, and order history. Built with Next.js, Redux Toolkit, Tailwind CSS, Stripe Checkout, NextAuth (Google OAuth), and Firebase (Firestore + Admin SDK).

This project is intended for learning and portfolio purposes. It is not affiliated with Amazon. Do not use real payment cards in non‑production environments.

### Key Features

- **Product catalog**: Home feed and full products page powered by `fakestoreapi.com` with SSR and SSG
- **Search and filters**: Header search with term highlighting; sidebar filters by category, brand, and price slider
- **Product detail page**: Ratings, pricing, Prime badge, related products, add‑to‑basket with quantity control
- **Shopping cart**: Side cart preview, localStorage persistence, quantity updates, remove items
- **Checkout and payments**: Stripe Checkout session creation and redirect
- **Webhooks + order storage**: Stripe webhook writes completed orders to Firebase Firestore
- **Authentication**: NextAuth Google OAuth; order history gated by login
- **Responsive UI**: Tailwind CSS JIT with custom theme and Next.js Image optimization

### Tech Stack

- **Frontend**: Next.js (React 17), Tailwind CSS, Heroicons, React Responsive Carousel
- **State management**: Redux Toolkit (`@reduxjs/toolkit`), `react-redux`
- **Auth**: NextAuth.js (Google provider)
- **Payments**: Stripe Checkout and Webhooks
- **Backend/DB**: Next.js API Routes, Firebase (Firestore + Admin SDK)
- **Utilities**: Axios, Moment, Micro (raw body for webhooks)

### Architecture & Data Flow

- **Data fetching**:
  - Home (`/`): `getServerSideProps` fetches products from `https://fakestoreapi.com/products`.
  - Products listing (`/products`): `getStaticProps` builds a filterable catalog.
  - Product details (`/products/[id]`): `getStaticPaths` + `getStaticProps` for individual product pages.
- **State shape** (`src/slices/basketSlice.js`):
  - `items`: array of cart items with `id`, `title`, `price`, `quantity`, etc. persisted to `localStorage`.
  - `products`, `filteredProducts`: catalog and filtered results used by filter UI.
- **Checkout**:
  - Client calls `/api/create-checkout-session` to create a Stripe Checkout Session with line_items and metadata.
  - Stripe redirects back to `/success` or `/checkout`.
  - Webhook `/api/webhook` verifies signature and writes orders under `users/{email}/orders/{sessionId}` in Firestore.
- **Auth**:
  - NextAuth Google provider, session used for checkout email and orders page access.

### Screens

- Home feed with banner and featured products
- Products page with filters (category, brand, price)
- Product detail with gallery and add‑to‑basket
- Cart and checkout
- Orders history page (requires login)
- Success confirmation page

### Project Structure

```
src/
  pages/
    index.js                 # Home (SSR)
    products/index.js        # Products listing (SSG)
    products/[id].js         # Product details (SSG + paths)
    checkout.js              # Cart + Stripe checkout
    success.js               # Post‑checkout confirmation
    orders.js                # Orders (requires auth)
    api/
      create-checkout-session.js
      webhook.js
      auth/[...nextauth].js  # NextAuth Google
  components/                # UI components (Header, Filter, Product, etc.)
  app/store.js               # Redux store configuration
  slices/basketSlice.js      # Cart/catalog slice
firebase.js                  # Client Firestore init
permissions.json             # Firebase Admin credentials (not committed)
```

### Environment Variables

Create a `.env.local` in the project root with:

```
# NextAuth (Google OAuth)
GOOGLE_ID=your_google_oauth_client_id
GOOGLE_SECRET=your_google_oauth_client_secret

# Stripe
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_SIGNING_SECRET=whsec_...           # Webhook signing secret

# App base URL (used for Stripe success/cancel URLs)
HOST=http://localhost:3000
```

Additional setup:

- `next.config.js` reads `STRIPE_PUBLIC_KEY` as `stripe_public_key` for the client.
- Update `images.domains` in `next.config.js` if you change image sources.
- Stripe shipping rates: update `shipping_rates` in `src/pages/api/create-checkout-session.js` to a valid rate ID from your Stripe account, or remove the field during local testing.
- Firebase:
  - Client SDK: Replace the placeholder values in `firebase.js` with your own Firebase project config.
  - Admin SDK: Add a service account JSON to project root as `permissions.json` (never commit secrets). The webhook uses this to write orders.

### Getting Started

1. Install dependencies

```
yarn
# or
npm install
```

2. Configure environment

```
# Create .env.local and fill in keys as described above
```

3. (Optional) Configure Firebase

- Update `firebase.js` with your project credentials
- Place your Admin service account JSON at `permissions.json`

4. Run the development server

```
yarn dev
# or
npm run dev
```

Visit `http://localhost:3000`.

5. Stripe Webhook (for orders persistence)

```
stripe listen --forward-to localhost:3000/api/webhook
```

Set `STRIPE_SIGNING_SECRET` to the value shown in your terminal.

### API Routes

- `POST /api/create-checkout-session`: creates a Stripe Checkout Session
- `POST /api/webhook`: Stripe webhook endpoint (raw body, signature verified)
- `GET/POST /api/auth/[...nextauth]`: NextAuth routes (Google provider configured)

### Skills Demonstrated

- Next.js: SSR, SSG, dynamic routes, API routes, Image optimization
- Redux Toolkit: slice pattern, selectors, localStorage persistence
- Authentication: NextAuth Google OAuth, session handling
- Payments: Stripe Checkout integration, webhook signature verification
- Firebase: Firestore reads/writes with Admin SDK for secure server‑side operations
- UI Engineering: Tailwind CSS, responsive layout, accessibility considerations

### Known Limitations

- Hard‑coded Stripe `shipping_rates` ID must be replaced with your own to complete checkout
- This is a demo store; product data comes from `fakestoreapi.com`
- Do not deploy with sample credentials; supply your own keys and secrets

### Deployment

- Works well on Vercel. Ensure all environment variables are configured in your hosting provider.
- Add your webhook endpoint in Stripe Dashboard and use the live signing secret in production.

### License

MIT

<!--
SEO/Indexing hints for portfolio and AI scrapers:
Keywords: Next.js, React, Redux Toolkit, NextAuth, Google OAuth, Stripe Checkout, Webhooks, Firebase Firestore, Firebase Admin SDK, Tailwind CSS, SSR, SSG, E‑commerce, Shopping Cart, Payments, Portfolio Project.
-->
