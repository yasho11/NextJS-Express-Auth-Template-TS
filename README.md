
# 🔐 Auth Template App (Next.js + Express + MongoDB)

A full-stack authentication boilerplate for personal or professional projects. This app separates the frontend and backend, offering a scalable architecture with JWT-based authentication and secure routes.

---

## 📦 Tech Stack

### 🧠 Frontend
- **Next.js 14+**
- **Zustand** – Global state management
- **Axios** – API handling
- **TailwindCSS** – Styling
- **React Hot Toast** – Notifications

### 🚀 Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **Multer** – File upload support (ready for extension)
- **bcrypt** – Password hashing
- **jsonwebtoken** – Secure session management

---

## ✅ Features

### 🔐 Authentication
- Signup / Login / Logout
- JWT-based auth with HTTP-only cookie
- Secure protected routes
- Auto-refresh token on page load

### 👤 User State
- Zustand global state to manage loading, auth user, and errors
- Toasts for user feedback

### 🌐 API Routing
- **Frontend** communicates only with backend (`/api/auth`)
- Error handling for both expected (401, 403) and unexpected errors

### 🧱 Clean Project Structure
- Modular Express routes
- MVC-style controllers on backend
- Frontend hooks in `useAuthStore`

---

## 🛠️ Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/auth-template.git
cd auth-template

# Install backend dependencies
cd server
npm install

# Run backend server
npm run dev

# In another terminal, install frontend dependencies
cd ../client
npm install

# Run frontend server
npm run dev
```

---

## 📁 Folder Structure

```
auth-template/
│
├── client/                # Next.js Frontend
│   ├── pages/
│   ├── hooks/useAuthStore.ts
│   ├── utils/axiosInstance.ts
│   └── ...
│
├── server/                # Express Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── models/
│   └── ...
```

---

## 🌱 Environment Variables

### Frontend `.env.local`
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

### Backend `.env`
```
PORT=5000
MONGO_URI=your-mongodb-url
JWT_SECRET=your-jwt-secret
```

---

## 🔒 Secure Practices
- Passwords hashed with bcrypt
- Tokens stored in HTTP-only cookies
- Express error middleware handles sensitive messages
- CORS policy defined clearly

---

## 📄 Future Extensions
- Add Google OAuth or GitHub OAuth
- Add file uploads with Multer
- Add role-based access control
- Protect client-side routes with middleware

---

## 🧪 Local Testing
- Use Postman for direct API testing
- Use `Zustand Devtools` in browser
- Use `console.log` and `console.error` to debug both backend & frontend (allowed in dev mode)

---

## ✅ TL;DR (What's Inside)

```
✅ Next.js frontend with Zustand + Tailwind
✅ Express.js backend with JWT Auth
✅ MongoDB + Mongoose models
✅ Login, Signup, Protected Routes
✅ Global state management
✅ Toasts for UX feedback
✅ Clean folder structure (MVC + modular)
✅ Ready for Multer file uploads
✅ HTTP-only cookies for secure auth
```

---

Made with ❤️ by [Your Name]
