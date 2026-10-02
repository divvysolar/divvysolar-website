# ☀️ Divvy Solar Website

Divvy Solar is a high-end B2B website built for solar infrastructure projects. It features a powerful **Admin Panel** to manage Leads and Blogs efficiently.

---

## 🏗️ Architecture (How it Works)

This project is built using **Next.js 14 (App Router)**. Here is the simple breakdown:

1.  **Frontend**: A premium UI built with React and Tailwind CSS for a professional look.
2.  **Backend**: Next.js API Routes handle server-side logic and database connectivity.
3.  **Database**: All data (Leads/Blogs) is stored securely in **MongoDB Atlas**.
4.  **Security**: **NextAuth** is used for secure Admin login and session management.
5.  **Notifications**: **Nodemailer** sends instant email alerts to the admin whenever a new lead is submitted.

---

## 🚀 Deployment (How to Deploy on Vercel)

Deploying this project to Vercel is very straightforward:

1.  **Upload to GitHub**: First, push your code to a GitHub repository.
2.  **Connect to Vercel**: Go to the [Vercel Dashboard](https://vercel.com/dashboard), click `Add New Project`, and select your repository.
3.  **Environment Variables**: In Vercel settings, add the following variables:
    *   `MONGODB_URI`: Your MongoDB connection string.
    *   `NEXTAUTH_SECRET`: A random secret string (e.g., `mysecret123`).
    *   `NEXTAUTH_URL`: Your production domain (e.g., `https://divvysolar.in`).
    *   `EMAIL_USER` & `EMAIL_PASS`: Gmail credentials for lead notifications.
4.  **Deploy**: Click the `Deploy` button. That's it!

---

## 🛠️ Tech Stack

*   **Framework**: Next.js 14
*   **Styling**: Tailwind CSS (Glassmorphism Design)
*   **Database**: MongoDB + Mongoose
*   **Authentication**: NextAuth.js
*   **Icons**: Lucide & Heroicons

---

## 🔐 Admin Panel Details

The admin panel can be accessed at the `/admin` URL.

*   **Leads Dashboard**: View and track all customer inquiries in one place.
*   **Blog CMS**: Create, edit, or delete blog posts directly from the UI.
*   **Secure Access**: Only authorized users with the correct credentials can access the dashboard.

---

## 💻 Local Setup (Run on your PC)

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Setup Env file**:
    Copy `.env.example` to `.env.local` and fill in your details.
3.  **Start Development Server**:
    ```bash
    npm run dev
    ```
    Open `localhost:3000` in your browser.

---

## 📂 Project Structure

*   `app/` - Pages and API routes.
*   `components/` - Reusable UI blocks (Hero, Footer, etc).
*   `models/` - Database schemas (Leads, Blogs).
*   `public/` - Static assets like images and icons.

---
*Built with Next.js for Divvy Solar.*
