# 🛍️ La Verona – E-Commerce Web Application

## 📖 Abstract

La Verona is a simple yet functional e-commerce web application designed to simulate the core workflow of an online shopping platform. Users can browse products, add them to their shopping cart, and proceed to checkout in an intuitive and user-friendly interface.

The project emphasizes **front-end interactivity** and **basic e-commerce logic**, including:

- Product listing and categorization
- Dynamic cart management (add, update, and remove items)
- Real-time calculation of cart totals
- Responsive design for seamless user experience

This project demonstrates fundamental **web development concepts (HTML, CSS, JavaScript)** while serving as a foundation that can be extended with **back-end integration, payment gateways, and database support**.

---

## 📝 Introduction

With the rapid growth of digital commerce, online stores have become essential for providing customers with convenient access to products and services. **La Verona** replicates the core functionalities of such systems in a clean and minimal design.

Key features:

- Explore a collection of products with details (price, category, sizes).
- Add products to the shopping cart with quantity and size options.
- Track subtotal and update cart items dynamically.
- Place orders and receive confirmation with a detailed summary.

La Verona serves as both a **learning project** and a **starter model** for building real-world shopping platforms.

---

## ⚙️ Features

- 🔹 **Product Listing & Filtering**: View products with details, filter by category, price range, or size.
- 🔹 **Dynamic Shopping Cart**: Add, update, remove items; real-time subtotal calculation.
- 🔹 **User Profile Management**: Update personal details, stored securely with validation.
- 🔹 **Order Confirmation**: Displays full order summary with products, quantities, and total.
- 🔹 **Responsive Design**: Works seamlessly on desktop and mobile screens.
- 🔹 **Interactive Slider**: Auto/manual image slider for banners and promotions.
- 🔹 **API Integration**: Uses [FakeStoreAPI](https://fakestoreapi.com/) for fetching and updating product and user data.
- 🔹 **LocalStorage Support**: Stores cart and profile data locally.

---

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript (ES6)
- **API**: [FakeStoreAPI](https://fakestoreapi.com/)
- **Storage**: LocalStorage for persisting cart and user data

---

## 📂 Project Structure

````
La-Verona/
│── index.html # Home page (products, slider, filters)
│── profile.html # User profile page
│── cart.html # Shopping cart page
│── order_confirmation.html # Order confirmation page
│
├── assets/
│ ├── css/
│ │ └── style.css # Custom styles
│ │
│ ├── img/ # Images (products, banners, icons)
│ │ └── default.png
│ │
│ └── JS/
│ ├── FakeAPI.js # Handles API calls (fetch, update users, etc.)
│ ├── Slider.js # Image slider logic
│ ├── Product.js # Product model & filtering logic
│ ├── ProductsCards.js # Dynamic product card rendering
│ ├── profile.js # User profile management
│ ├── cart.js # Cart functionality (add, update, remove items)
│ └── order_confirmation.js # Renders final order summary & clears cart
│
├── README.md # Project documentation
└── LICENSE # License file (MIT recommended)```

## 🚀 Setup & Usage

1. Clone this repository:
   ```bash
   git clone https://github.com/MuhammedZaghloulCS/la-verona-JS-simple-e-commerce.git
````

## 🚀 Getting Started

1. Open the project folder.
2. Run **`index.html`** in your browser (no server required).

⚡ If you need live API data, ensure you have internet access since the project fetches from [FakeStoreAPI](https://fakestoreapi.com).

---

## 📌 Pages Overview

### 🏠 Home Page (`index.html`)

- Displays product listing with filtering.
- Interactive slider.

### 👤 Profile Page (`profile.html`)

- Allows users to view and edit profile details.
- Validates inputs and stores in **localStorage**.

### 🛒 Cart Page (`cart.html`)

- Shows cart items with quantity, size, and price.
- Allows updating or removing items.
- Calculates subtotal dynamically.

### ✅ Order Confirmation Page (`order_confirmation.html`)

- Displays placed order with details.
- Shows total and clears cart after confirmation.

---

## 🔮 Future Enhancements

- ✅ User authentication system
- ✅ Payment gateway integration
- ✅ Database for persistent cart & order history
- ✅ Admin dashboard for product management

---

## 📄 License

This project is **open-source** and available under the **MIT License**.
