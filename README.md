# 🔎 Back2U — Lost & Found Platform

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)]()
[![React](https://img.shields.io/badge/Frontend-React-blue)]()
[![Redux](https://img.shields.io/badge/State-Redux-purple)]()
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC)]()
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)]()
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)]()
[![Authentication](https://img.shields.io/badge/Auth-JWT-orange)]()
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)]()

Back2U is a **community-driven Lost & Found web platform** that helps people report lost items and reconnect them with individuals who may have found them.

The platform allows users to **post lost or found items, upload images, search listings, and contact other users** to return items to their rightful owners.

🔗 **Repository**  
https://github.com/k-chetanya/Back2u_v2

---

# ✨ Features

## 📝 Item Reporting
- Post **Lost Items**
- Post **Found Items**
- Upload **images of items**
- Add description, category, and location

## 🔍 Search & Filtering
- Search items easily
- Filter lost/found listings
- Dynamic updates using **React state**

## 🔐 Secure Authentication
- **JWT-based authentication**
- **Password hashing using bcrypt**
- **Secure token verification**
- Additional cryptographic operations using **Node.js crypto**

## ⚡ State Management
- Global state handled using **Redux**
- Efficient data flow across the frontend
- Scalable architecture for future features

## ☁️ Image Uploads
- Image hosting using **Cloudinary**
- Secure API-based image uploads
- Optimized image delivery

## 📧 User Communication
Instead of implementing a full chat system, users can **contact each other directly via email** to coordinate the return of lost items.

This approach keeps the system **lightweight and simple** while still enabling effective communication.

---

# 🛠 Tech Stack

## Frontend
- **React.js**
- **Redux**
- **Tailwind CSS**
- **Vite**

## Backend
- **Node.js**
- **Express.js**

## Database
- **MongoDB**

## Authentication & Security
- **JWT (JSON Web Tokens)**
- **bcrypt**
- **Node.js crypto**

## Media Storage
- **Cloudinary**

## Development Tools
- **Git**
- **GitHub**
- **Postman**
- **VS Code**

---

# 📁 Project Structure

```
Back2U
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/k-chetanya/Back2u_v2.git
cd Back2u_v2
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend** directory:

```
MONGO_URI=your_mongodb_connection_string
appName=Cluster0
PORT=8000
SECRET_KEY=your_jwt_secret_key

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

---

Create a `.env` file inside the **frontend** directory:

```
VITE_API_URL=your_backend_api_url
```

Example:

```
VITE_API_URL=http://localhost:8000/api
```

---

# 🚀 Future Improvements

- Real-time chat using **Stream Chat**
- Location-based item matching
- Notification system for matching lost/found items
- AI-assisted item matching
- Mobile application version
- Progressive Web App (PWA)

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to contribute:

1. Fork the repository  
2. Create a new feature branch  
3. Commit your changes  
4. Submit a pull request  

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Chetanya Karra**

GitHub:  
https://github.com/k-chetanya

---

⭐ If you like this project, consider **starring the repository**!
