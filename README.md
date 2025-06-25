# Tasty Tales 🍽️

**Tasty Tales** is a dynamic recipe-sharing platform that allows users to explore, contribute, and manage food recipes. In addition to recipe features, it includes an admin dashboard and parcel management system for handling deliveries of food products or ingredients.

---

## 🚀 Features

- 🔐 **User Authentication** using Firebase
- 🧑‍🍳 **Add and View Recipes**
- 📄 **Recipe Details with Dynamic Routing**
- 🛒 **Buy Now** and **My Cart** Features
- 🧑‍💼 **Admin Dashboard**:
  - Dashboard overview
  - Total Recipes & Users
  - My Recipes view
  - Add Parcel with cost calculator
- 📦 **Add Parcel Form** with:
  - Pickup & Delivery location fields
  - Dynamic cost calculation based on parcel type, service center, and weight
  - Confirmation via Toast notification

---

## 🧰 Tech Stack

- **React.js**
- **React Router DOM v6**
- **Firebase Authentication**
- **Tailwind CSS**
- **Framer Motion**
- **Context API**
- **React Toastify**
- **Vite**
- **JSON (Static data)**

---




| **Parcel Type** | **Weight** | **Within City** | **Outside City/District**       |
| --------------- | ---------- | --------------- | ------------------------------- |
| Document        | Any        | ৳60             | ৳80                             |
| Non-Document    | Up to 3kg  | ৳110            | ৳150                            |
| Non-Document    | Over 3kg   | ৳110 + ৳40/kg   | ৳150 + ৳40/kg + ৳40 (extra fee) |


Delivery cost is dynamically calculated on form submission and shown via Toast before final confirmation.
✍️ Author
Moniruzzaman (Alvin Monir)
📧 alvinmonir411@gmail.com


📄 License
This project is licensed for educational and portfolio use. For production or commercial use, please contact the author.

vbnet
Copy
Edit

Let me know if you want this saved as a `.md` file or need help uploading it to GitHub.