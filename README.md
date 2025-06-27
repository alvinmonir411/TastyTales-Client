# Tasty Tales 🍽️

**Tasty Tales** is a dynamic recipe-sharing platform where users can explore, contribute, and manage delicious food recipes. The platform features a user-friendly admin dashboard and a parcel management system for food or ingredient deliveries.

![React](https://img.shields.io/badge/Frontend-React-blue?style=flat-square)
![Firebase](https://img.shields.io/badge/Auth-Firebase-yellow?style=flat-square)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🚀 Features

### 🧑‍🍳 General Users
- 🔐 Firebase Authentication
- 📄 View dynamic recipe details
- 🛒 Buy Now and My Cart functionality

### 🧑‍💼 Admin Dashboard
- Dashboard overview (Total Recipes & Users)
- View My Recipes
- Add Parcel with cost calculator

### 📦 Parcel Management
- Pickup & Delivery location inputs
- Dynamic delivery cost calculation:
  - Based on parcel type, location, and weight
  - Result shown via Toast confirmation

---

## 💻 Tech Stack

- React.js + Vite
- React Router DOM v6
- Firebase Authentication
- Tailwind CSS
- Framer Motion
- React Toastify
- Context API
- JSON (Static data)

---

## 📊 Parcel Pricing Rules

| Parcel Type   | Weight         | Within City | Outside City/District |
|---------------|----------------|-------------|------------------------|
| Document      | Any            | ৳60         | ৳80                   |
| Non-Document  | Up to 3kg      | ৳110        | ৳150                  |
| Non-Document  | Over 3kg       | ৳110 + ৳40/kg | ৳150 + ৳40/kg + ৳40 |

> 💡 Delivery cost is calculated dynamically on form submission and shown via toast before confirmation.

---

## 🛠️ Getting Started

1. **Clone the Repo**
   ```bash
   git clone https://github.com/alvinmonir411/TastyTales-Client.git
   cd TastyTales-Client
Install Dependencies

bash
Copy
Edit
npm install
Start the Development Server

bash
Copy
Edit
npm run dev
Environment Variables
Make sure to configure your .env file with Firebase credentials and API endpoints.

📂 Project Structure (Client)
arduino
Copy
Edit
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── routes/
│   ├── hooks/
│   └── App.jsx
├── .env
├── index.html
└── vite.config.js
🌐 Related Repositories
🔗 TastyTales-Server (Backend)

✍️ Author
Moniruzzaman (Alvin Monir)
📧 alvinmonir411@gmail.com

📄 License
This project is licensed for educational and portfolio use. For production/commercial use, please contact the author.

If you'd like this automatically committed to your repo or want a matching server-side README, just let me know.

vbnet
Copy
Edit

---

### ✅ Next Steps:
1. **Want me to save this as a `.md` file** you can directly upload?
2. Or would you like step-by-step help adding this to GitHub (via `git add`, `commit`, `push`)?

Let me know if you want a custom banner image or demo GIF as well — it’ll make the repo stand out beautifully.