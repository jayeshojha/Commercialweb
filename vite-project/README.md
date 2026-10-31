# Furni - Modern E-Commerce Web Application

A modern, responsive e-commerce web platform for interior design and furniture crafted with **React 18**, **Vite**, **Redux Toolkit**, and **Firebase (Authentication & Cloud Firestore)**.

---

## 🚀 Key Features

- **Modular Architecture**: Clean separation of concerns with components, pages, Redux slices, services, and utilities.
- **Firebase Authentication**:
  - Sign Up (Register) with Email & Password.
  - Sign In (Login) with Email & Password.
  - One-Click Google Authentication (`signInWithPopup`).
  - Persistent login session across page refreshes via `onAuthStateChanged`.
- **Firebase Cloud Firestore Database**:
  - User profiles stored in `users` collection.
  - Shopping cart synchronization across sessions in real-time.
  - Product catalog fetched from `products` collection with automatic fallback and self-seeding.
- **Redux State Management**:
  - `authSlice`: tracks logged-in user, session status, login modal toggle, and loading/error states.
  - `cartSlice`: tracks cart items, item quantities, total calculation, and custom Firestore auto-sync middleware.
  - `productSlice`: handles catalog filtering by categories (Chairs, Sofas, Tables) and instant keyword search.
- **Reusable UI Components**:
  - Shared `Layout` with dynamic `Navbar` and `Footer`.
  - Reusable `HeroBanner` with customizable actions and imagery.
  - Interactive `ProductCard` and `ProductGrid`.
  - Responsive pure-React `TestimonialSlider` (no jQuery / unbundled external dependencies).
  - Feature highlights: `WhyChooseUs`, `WeHelpSection`, `PopularProducts`, `TeamSection`, `BlogSection`.

---

## 📁 Project Structure

```
vite-project/
├── .env.example                     # Sample Firebase environment variables
├── .eslintrc.cjs                    # ESLint configuration
├── index.html                       # HTML5 entry with Bootstrap & FontAwesome
├── vite.config.js                   # Vite configuration with chunk splitting
├── public/
│   ├── css/                         # Static stylesheets
│   └── images/                      # Optimized image assets
└── src/
    ├── assets/                      # Static SVG icons
    ├── components/
    │   ├── auth/
    │   │   ├── LoginModal.jsx       # Modal for email & Google sign-in
    │   │   └── ProtectedRoute.jsx   # Route guard component
    │   ├── common/
    │   │   ├── Footer.jsx           # Global footer with newsletter form
    │   │   ├── HeroBanner.jsx       # Reusable hero banner for all pages
    │   │   ├── Layout.jsx           # Master layout wrapper (Navbar + Outlet + Footer)
    │   │   └── Navbar.jsx           # Responsive navbar with cart badge & user status
    │   ├── features/
    │   │   ├── BlogSection.jsx      # Recent editorial articles grid
    │   │   ├── PopularProducts.jsx  # Featured products showcase
    │   │   ├── TeamSection.jsx      # Our leadership & design team
    │   │   ├── TestimonialSlider.jsx# Pure-React review carousel
    │   │   ├── WeHelpSection.jsx    # Craftsmanship photo grid & features
    │   │   └── WhyChooseUs.jsx      # Core value propositions
    │   └── shop/
    │       ├── ProductCard.jsx      # Individual product item with Add to Cart
    │       └── ProductGrid.jsx      # Responsive catalog grid
    ├── config/
    │   └── firebase.js              # Firebase SDK configuration & initialization
    ├── data/
    │   ├── blogData.js              # Blog posts dataset
    │   ├── initialProducts.js       # Default seed furniture items
    │   └── teamData.js              # Team profiles dataset
    ├── pages/
    │   ├── About.jsx                # About us page
    │   ├── Blog.jsx                 # Blog listing page
    │   ├── Cart.jsx                 # Shopping cart with quantity adjustment & subtotal
    │   ├── Contact.jsx              # Customer inquiry & contact details
    │   ├── Home.jsx                 # Homepage with hero & featured collections
    │   ├── NotFound.jsx             # 404 page
    │   ├── Register.jsx             # User registration with Firebase
    │   ├── Service.jsx              # Services showcase page
    │   └── Shop.jsx                 # Filterable product catalog with search
    ├── redux/
    │   ├── slices/
    │   │   ├── authSlice.js         # Authentication slice
    │   │   ├── cartSlice.js         # Cart actions & calculations slice
    │   │   └── productSlice.js      # Product filtering & search slice
    │   └── store.js                 # Redux Toolkit store + Firestore middleware
    ├── services/
    │   ├── authService.js           # Firebase Auth API methods & error formatting
    │   └── firestoreService.js      # Firestore database operations (cart, products, users)
    ├── utils/
    │   └── formatters.js            # Currency & number formatting helpers
    ├── App.css                      # Core application styling
    ├── App.jsx                      # App router configuration
    ├── index.css                    # Base CSS variables
    └── main.jsx                     # React root DOM mount
```

---

## ⚙️ Firebase Setup Instructions

1. Visit the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Under **Build > Authentication**, enable:
   - **Email/Password**
   - **Google** (optional, recommended)
3. Under **Build > Firestore Database**, click **Create Database** (start in Test mode for development).
4. Go to **Project Settings > General > Your apps**, click the Web icon (`</>`), and copy your configuration credentials.
5. Create a `.env` file in the root directory (based on `.env.example`):

```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Note**: Even without live credentials, the app includes an automatic offline preview mode so you can test registration, login, and the shopping cart locally without runtime errors!

---

## 🛠️ Development & Build Commands

```bash
# Run local development server
npm run dev

# Run ESLint validation
npm run lint

# Compile production build
npm run build

# Preview production build locally
npm run preview
```
