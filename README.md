# Heartline App

**Heartline App** is a minimal authentication app built with [Next.js](https://nextjs.org/) App Router. It supports secure registration, login, session-based authentication with cookies, and profile management—all using in-memory storage.

---

## 🚀 Features

- 🔒 Secure registration and login with hashed passwords (`bcryptjs`)
- 🍪 Session stored in `HttpOnly` cookies (no JWTs)
- 👤 Protected `/profile` route (accessible only when logged in)
- 🧠 In-memory user storage (great for learning and prototyping)
- 🎨 Clean, responsive UI with Tailwind CSS
- ⚡ Built using the Next.js App Router (`src/app` directory)

---

## 📁 Project Structure

<pre>
src/
├── app/
│   ├── api/                # API routes for register, login, profile
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── profile/            # Protected profile page
│   └── layout.tsx          # Global layout with header and footer
├── lib/
│   ├── serverUsers.ts      # In-memory user store + session handling
│   └── constants.ts        # Constant variables
├── styles/
│   └── globals.css         # Tailwind & global styles
├── types/
│   └── user.ts             # User type definition
</pre>

---

## 🛠️ Technologies Used

- **Next.js 14** with App Router
- **Tailwind CSS** for styling
- **bcryptjs** for secure password hashing
- **Secure cookies** via `next/headers` and `cookies()`

---

## 🧪 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/shanta3220/nextjs-demo.git
cd heartline-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Then open your browser and visit:  
**👉 [http://localhost:3000](http://localhost:3000)**
