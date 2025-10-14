
---

# 🌸 React E-Commerce Store

A fully functional e-commerce store built with **React**, **Tailwind CSS**, and **Firebase Authentication**, featuring cart management, localStorage persistence, and a mobile-friendly UI.

![Demo Screenshot](/src/assests/demo.png)

---

## **Features**

* **User Authentication**

  * Sign in with Google (popup for desktop, redirect for mobile)
  * Logout functionality
  * User profile page with avatar and name

* **Product Listing**

  * View all products
  * Category filtering
  * Product details page with images, price, and description

* **Shopping Cart**

  * Add/remove items
  * Adjust quantity
  * Persistent cart using `localStorage`
  * Order summary with subtotal, shipping, and total

* **Checkout**

  * Demo checkout with cart clearing and feedback
  * Can be integrated with Stripe, PayPal, or Firebase for real orders

* **Responsive UI**

  * Mobile-first design
  * Tailwind CSS for styling
  * Smooth animations using Framer Motion

* **Toasts & Notifications**

  * Custom toast notifications for actions like “Item Added”

---

## **Tech Stack**

* **Frontend:** React, React Router, Tailwind CSS, Framer Motion
* **Authentication:** Firebase Auth (Google Sign-In)
* **State Management:** React `useState` & `useEffect`
* **Hosting:** Local development with Vite (ngrok for mobile testing)
* **Icons:** Lucide-react

---

## **Installation**

1. Clone the repository:

```bash
git clone https://github.com/Coderharshit01/react-ecommerce.git
cd react-ecommerce
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase:

* Create a project in [Firebase Console](https://console.firebase.google.com/)
* Enable **Google Authentication**
* Copy your Firebase config into `FireBaseLogin/firebase.js`
* Add your **local development domain** and/or **ngrok URL** to Firebase authentication allowed domains

4. Start the development server:

```bash
npm run dev
```

* Open `http://localhost:5173` or your ngrok URL on mobile to test Google sign-in.

---

## **Usage**

* Browse products from the home page or categories
* Click **Add to Cart** to add items
* Click **Cart** icon to view your cart
* Adjust quantity or remove items
* Click **Checkout** to clear the cart and simulate an order
* Sign in with Google to save your cart and access profile

---

## **Folder Structure**

```
src/
├─ components/        # Reusable UI components (Navbar, Cart, Toast, etc.)
├─ pages/             # Pages (Home, Shop, Category, Product, Profile)
├─ FireBaseLogin/     # Firebase configuration and provider
├─ App.jsx            # Main app with routes
└─ index.jsx          # Entry point
```

---

## **Future Improvements**

* Integrate **Stripe** or **PayPal** for real checkout
* Save orders in **Firebase Firestore**
* Add search and filter for products
* Add user order history
* Improve animations and UI polish

---

## **License**

This project is licensed under the MIT License.

---

