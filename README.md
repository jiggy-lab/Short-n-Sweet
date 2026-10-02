# Short n’ Sweet Bakery 🥐🎂

> **Comfort in every single bite.**  
> An artisanal delivery-only bakery web application crafted with European butter, pure vanilla, and real care. Based in Lagos, Nigeria with nationwide delivery capabilities.

---

## 🌟 Highlights & Features

- **🍰 Curated Bakery Catalog**: Handcrafted celebration cakes, 72% fudgy brownies, laminated croissants, sea salt cookies, and curated treat boxes.
- **⚡ Intuitive & Interactive Search**: Instant live search with one-tap suggestion chips (`Brownies`, `Salted Caramel`, `Croissants`, `Treat Box`), category tiles, and direct *Add to Bag* actions inside the search modal.
- **⏰ Smart Lead-Time Engine**: Enforces automatic 2-day advance notice for artisanal cakes while allowing next-day delivery for cookies, brownies, and morning pastries.
- **🛍️ Seamless Bag & Slide-out Cart**: Real-time quantity adjustments, custom gift messages on order items, subtotal calculation, and clear delivery fee breakdown.
- **💳 Simulated Nigerian Checkout Flow**:
  - Full Nigerian state selection (Lagos Mainland/Island, Abuja FCT, Rivers, etc.).
  - Delivery date calendar respecting cake lead times.
  - Authentic payment institution options with official logos: **Mastercard**, **Visa**, **Verve**, and **Bank Transfer** (Wema/Providus simulation).
- **📦 Live 5-Stage Baker Order Tracking**: Enter your order reference (e.g. `SNS-98241`) to inspect real-time baking, quality check, packaging, dispatch, and delivery status.
- **🎨 Artisanal Design System**: Built with Fraunces serif and DM Sans typography, a warm buttercream palette (`#FAF7EE`), deep charcoal (`#20221F`), and sage accents (`#5C7461`). Completely custom responsive dropdowns and components without plain browser popups.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 6+](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Google Fonts (*Fraunces* serif & *DM Sans*)
- **State Management**: React Context (`CartContext` & `OrderContext`) with persistent LocalStorage

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (comes bundled with Node.js)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/short-n-sweet-bakery.git
   cd short-n-sweet-bakery
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production-ready assets will be compiled into the `dist/` directory.

5. **Typecheck & Lint**:
   ```bash
   npm run lint
   ```

---

## 📁 Project Structure

```text
├── index.html               # Main HTML entry point with fonts & metadata
├── package.json             # Scripts & dependencies
├── vite.config.ts           # Vite + Tailwind v4 configuration
├── tsconfig.json            # TypeScript configuration
├── src/
│   ├── main.tsx             # Application mount point
│   ├── App.tsx              # Root router & layout orchestration
│   ├── types.ts             # TypeScript definitions for bakes & orders
│   ├── index.css            # Tailwind theme tokens & design system
│   ├── data/
│   │   └── products.ts      # Menu items, descriptions, prices & states
│   ├── context/
│   │   ├── CartContext.tsx  # Cart items, subtotal, delivery calculation
│   │   └── OrderContext.tsx # Order creation, simulated storage & lookup
│   ├── components/
│   │   ├── Navbar.tsx       # Desktop & mobile navigation
│   │   ├── AnnouncementBar.tsx # Shipping ticker & notice
│   │   ├── Footer.tsx       # Footer with Accepted Payments
│   │   ├── CustomSelect.tsx # Bespoke bakery dropdown in site colors
│   │   ├── PaymentIcons.tsx # Mastercard, Visa, Verve, Bank Transfer SVG marks
│   │   ├── SearchModal.tsx  # Interactive search dialog with instant add
│   │   ├── CartDrawer.tsx   # Slide-out bag drawer
│   │   ├── BrandLogo.tsx    # Short n' Sweet bakery emblem
│   │   └── Toast.tsx        # Action feedback alerts
│   └── pages/
│       ├── HomePage.tsx     # Hero bakes, bestsellers, mood explorer
│       ├── MenuPage.tsx     # Full catalog with search, category tabs & filters
│       ├── ProductDetailPage.tsx # Ingredient list, allergen notes & add to bag
│       ├── CartPage.tsx     # Full cart overview
│       ├── CheckoutPage.tsx # Address details & payment simulation
│       ├── ConfirmationPage.tsx # Order receipt & tracking link
│       ├── TrackOrderPage.tsx   # Live timeline order tracker
│       ├── AboutPage.tsx    # Story, ingredients & baking philosophy
│       └── ContactPage.tsx  # Custom cake inquiry form & FAQ accordion
```

---

## 👩‍🍳 Author & Credits

Designed & developed by **Adesegun Feranmi**.  
Demonstration portfolio project celebrating artisanal baking and Nigerian e-commerce UX.
