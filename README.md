# 📚 Full-Stack Library Management System

A modern full-stack library management system built with the **MERN stack** (MongoDB, Express.js, React, Node.js) and styled using **TailwindCSS**. This application supports full CRUD operations for books and borrowing records, and includes real-time borrow summaries and book availability logic.

---

## 🚀 Features

### ✅ Admin Features:
- Add, update, and delete books
- Borrow books with due dates
- View total borrowed summary by book
- Auto-update availability when copies reach zero
- Real-time UI updates using RTK Query caching and tagging

### 📊 Borrow Logic:
- Borrowing a book decreases available copies
- If copies reach `0`, the book becomes **unavailable**
- If copies increase again, availability toggles to **true**
- Borrow summary aggregates total borrowed quantity per book

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | Styling | State Management |
|----------|---------|----------|---------|------------------|
| React + Vite | Node.js + Express.js | MongoDB | TailwindCSS | Redux Toolkit Query |

---
---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/library-management-system.git
cd library-management-system

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

