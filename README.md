
```markdown
# 📨 PostMan Clone (Fullstack)

A lightweight fullstack Postman clone built with **React**, **Express**, and **Prisma**, designed to send API requests and store request history per user, uniquely identified via token-based authentication.

---

## 🌐 Live Demo

> (https://post-j0gaggz8i-ritesh-kumars-projects-7ffc0652.vercel.app/)  

---

## 📁 Project Structure

```

.
├── post-man\_backend        # Express + Prisma + NeonDB
└── post-man\_frontend       # React + Vite + TailwindCSS

````

---

## 🛠️ Tech Stack

### Frontend

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

### Backend

- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [NeonDB](https://neon.tech/)
- [jsonwebtoken (JWT)](https://github.com/auth0/node-jsonwebtoken)
- [CORS](https://www.npmjs.com/package/cors)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)

---

## ⚙️ How It Works

### 👤 Authentication Flow

- On first visit, if no `token` is found in cookies:
  - A new user token is generated via the `/auth` endpoint.
  - The token is stored in the browser using a **secure HTTP-only cookie**.
- On future visits, the token is sent with every request:
  - The backend authenticates and identifies the user using `jwt.verify(token)`.
  - This token is used to associate requests with users.

### 🧠 Backend Behavior

- **POST `/`**  
  Save a new request history object (`reqObj`) associated with the authenticated user.
  
- **GET `/`**  
  Fetch the authenticated user's request history (paginated).
  
- **Token Expiry Logic**  
  - Tokens expire after **1 day**.
  - When a token is found to be expired during verification, the backend:
    - Deletes all stored requests associated with that user.
    - Denies the request.

### 🧾 What You Can Do

- Input an API endpoint and send requests (GET, POST, etc.)
- View a real-time response
- Track request history per user session
- Auto-delete expired user entries to keep storage optimized

---

## 📦 Installation & Setup

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/postman-clone.git
cd postman-clone
````

### 2. Install Backend Dependencies

```bash
cd post-man_backend
npm install
```

> Create a `.env` file:

```env
DATABASE_URL="your_neon_db_url"
JWT_SECRET="your_secret_key"
```

> Run Prisma setup:

```bash
npx prisma generate
npx prisma migrate deploy
```

### 3. Install Frontend Dependencies

```bash
cd ../post-man_frontend
npm install
```

---

## 🚀 Running the Project

### Development

```bash
# Backend
cd post-man_backend
node server.js

# Frontend
cd ../post-man_frontend
npm run dev
```

---

## ☁️ Deployment on Render

### Frontend

* Build Command: `npm run build`
* Publish Directory: `dist`

### Backend

* Start Command: `node server.js`
* Environment Variables:

  * `DATABASE_URL`
  * `JWT_SECRET`

> Make sure **cookies** are set with:

```js
res.cookie('token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 86400000, // 1 day
});
```

And frontend requests include:

```js
fetch('https://api.yourdomain.com', {
  method: 'POST',
  credentials: 'include',
  ...
});
```

---

## 📁 .gitignore (at project root)

```gitignore
# Node
node_modules/
.env

# Vite
dist/

# Prisma
post-man_backend/prisma/dev.db
post-man_backend/generated/

# OS/IDE
.DS_Store
*.log
.vscode/
```

---

## 📌 Notes

* Token-based authentication using **cookies** is handled securely via `SameSite=None; Secure`.
* Prisma is used to interact with a **NeonDB** database to store request histories.
* When a user token expires, their data is purged to save space.

---

