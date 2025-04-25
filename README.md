
# Auth Template with Next.js, Express, and MongoDB

This is a full-stack authentication template using **Next.js**, **Express.js**, and **MongoDB**. It provides basic authentication features such as sign-up, login, and JWT authentication, and can be used as a starting point for any full-stack web application.

### Features

- **Frontend** (Next.js):
  - React-based UI for registration and login
  - State management with `Zustand`
  - Error handling and toast notifications
  - Simple page redirection on successful login

- **Backend** (Express):
  - Authentication via JWT (JSON Web Token)
  - MongoDB-based user storage
  - REST API routes for user authentication
  - File upload support (using Cloudinary for media)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Environment Configuration](#environment-configuration)
- [Usage](#usage)
- [TLDR (For Quick Reference)](#tldr-for-quick-reference)

---

## Tech Stack

- **Frontend:**  
  - Next.js
  - Zustand (State Management)
  - Axios (HTTP Requests)
  - Tailwind CSS (for styling)

- **Backend:**  
  - Express.js
  - MongoDB
  - JWT (JSON Web Token) for authentication
  - Cloudinary (for file uploads)

---

## Installation

### 1. **Frontend (Client) Setup**

- Navigate to the **`client`** folder.
- Install the required packages using `npm`:

```bash
cd client
npm install
```

In the frontend code, the **axios base URL** is directly set to point to the backend Express server at `http://localhost:5000`. You don't need a `.env.local` in the client anymore since it's hardcoded inside the code.

### 2. **Backend (Server) Setup**

- Navigate to the **`server`** folder.
- Install the required packages:

```bash
cd server
npm install
```

- Create a `.env` file in the **`server`** folder and configure the necessary environment variables:

```env
MONGO_URI=mongodb://localhost:27017/authTemp
PORT=5000
JWT_SECRET=b9885c9717aa494ab5a3c4a6d12b7d78077366eb85b002618ecef6413856a59d
CLOUDINARY_CLOUD_NAME=diywglw4g
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

Make sure to replace the `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` with your actual Cloudinary credentials.

---

## Folder Structure

### Frontend (Client)

```
/client
  /components
    - Form.js
    - Header.js
  /pages
    - /login.js
    - /signup.js
  /store
    - useAuthStore.js
  package.json
  tailwind.config.js
```

### Backend (Server)

```
/server
  /controllers
    - authController.js
  /routes
    - authRoutes.js
  /models
    - User.js
  /middlewares
    - authMiddleware.js
  /config
    - cloudinary.js
  .env
  package.json
```

---

## Environment Configuration

### Backend (.env)

```env
MONGO_URI=mongodb://localhost:27017/authTemp
PORT=5000
JWT_SECRET=b9885c9717aa494ab5a3c4a6d12b7d78077366eb85b002618ecef6413856a59d
CLOUDINARY_CLOUD_NAME=diywglw4g
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

Replace the placeholder values for Cloudinary with your actual API key and secret.

---

## Usage

1. **Start Backend**  
   From the `server` folder, start the Express server:

```bash
cd server
npm run dev
```

This will run the Express backend on `http://localhost:5000`.

2. **Start Frontend**  
   From the `client` folder, start the Next.js development server:

```bash
cd client
npm run dev
```

The frontend will now be running at `http://localhost:3000`.

---

## TLDR (For Quick Reference)

- **Frontend:**
  - Uses **Next.js** and **Zustand** for state management.
  - Axios is configured to connect to the backend via the hardcoded URL `http://localhost:5000` in the code.
  - Basic pages: Login, Signup.
  
- **Backend:**
  - **Express.js** handles API requests (signup, login).
  - **MongoDB** for user data storage.
  - **JWT** used for authentication.
  - **Cloudinary** for file upload handling.

- **Environment Variables**:
  - **Frontend**: No `.env.local` required. The frontend connects directly to `http://localhost:5000` (Express server).
  - **Backend**: `.env` configures `MONGO_URI`, `JWT_SECRET`, and `CLOUDINARY_*` credentials.

---

That's it! Now you have an authentication template that you can easily adapt and use for your future projects.

---

### Summary of Key Changes:
1. **Frontend:** The **axios base URL** is hardcoded in the frontend to `http://localhost:5000`, no need for `.env.local`.
2. **Backend:** The `.env` configuration includes database and Cloudinary credentials.

Feel free to customize it further and use it for your projects!
