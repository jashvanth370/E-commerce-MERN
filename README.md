# MERN E-Commerce Application

A full-featured e-commerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project includes user authentication, product management, cart functionality, admin features, and a modern responsive UI.

---

## 🚀 Features

- User registration & login (with profile picture upload)
- JWT authentication and protected routes
- Product listing, search, and category filtering
- Product details with image, price, description, and stock
- Add to cart, update quantity, remove items, clear cart
- Dynamic cart count in navbar
- Admin-only product creation
- Order history (placeholder for future expansion)
- Newsletter subscription (backend + frontend)
- Profile page with edit mode and profile picture update
- Responsive, modern UI with Tailwind CSS
- Real-time search with dropdown results
- Static image serving from backend

---

## 🗂️ Folder Structure

```
E-Commerce(mern)/
  backend/
    controller/         # Express controllers (auth, product, order, user, subscriber)
    middleware/         # Auth and upload middleware (multer)
    models/             # Mongoose models (user, product, order, subscriber)
    routes/             # Express routes
    uploads/            # Uploaded images
    utils/              # Utility files (e.g., JWT secret)
    index.js            # Main Express app
    package.json        # Backend dependencies
  frontend/
    public/             # Static assets
    src/
      components/       # React UI components
      pages/            # React pages (Home, Login, Register, Profile, Cart, AddProduct)
      service/          # API service files
      App.js            # Main React app
      index.js          # Entry point
      ...               # Styles, config, etc.
    package.json        # Frontend dependencies
  README.md             # Project documentation
```

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone <repo-url>
cd E-Commerce(mern)
```

### 2. Install dependencies
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Configure Environment
- Create a `.env` file in `backend/` with your MongoDB URI and JWT secret:
  ```env
  MONGO_URI=mongodb://localhost:27017/mern-ecommerce
  JWT_SECRET=your_jwt_secret
  PORT=8089
  ```

### 4. Run the Application
#### Start Backend
```bash
cd backend
npm start
```
#### Start Frontend
```bash
cd ../frontend
npm start
```
- The backend runs on [http://localhost:8089](http://localhost:8089)
- The frontend runs on [http://localhost:3000](http://localhost:3000)

---

## 🧑‍💻 Usage
- Register a new user (optionally upload a profile picture)
- Login to access your profile, cart, and more
- Browse products, search, filter by category
- Add products to cart, update quantities, checkout (future)
- Admins can add new products via the Add Product page
- Subscribe to the newsletter for updates

---

## 📝 Notes
- Product images are uploaded and served from the backend `/uploads` folder
- Admin status is stored in localStorage after login
- Order history and checkout are placeholders for future expansion
- Newsletter subscriptions are saved in MongoDB

---

## 📦 Dependencies
- **Backend:** express, mongoose, multer, cors, jsonwebtoken, bcryptjs
- **Frontend:** react, axios, react-router-dom, tailwindcss

---

## 📄 License
This project is for educational/demo purposes. Feel free to use and modify! 