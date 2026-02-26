# 🎨 MediAI Frontend

This is the frontend application of MediAI.
Built using React (Vite).

---

## 📁 Folder Structure

Frontend/
│
├── public/              → Static assets
├── src/
│   ├── assets/          → Images, icons
│   ├── components/      → Reusable UI components
│   ├── pages/           → Application pages (Home, Dashboard, etc.)
│   ├── services/        → API calls to backend
│   ├── hooks/           → Custom React hooks
│   ├── context/         → Global state management
│   ├── utils/           → Helper functions
│   └── App.jsx          → Root component
│
├── index.html
├── package.json
├── vite.config.js
└── .gitignore

---

## 🌐 Application Flow

Page → Component → API Service → Backend

- Pages manage layout
- Components are reusable UI elements
- Services handle API communication
- Context manages global state

---

## ⚙️ Setup Instructions

1. Install dependencies
   npm install

2. Start development server
   npm run dev

3. Build for production
   npm run build

---

## 📌 Rules for Contributors

- Keep components reusable.
- API calls must be inside services folder.
- No direct backend URLs inside components.
- Use environment variables for API base URL.
- Follow clean component structure.

---

## 🔥 Coding Standards

- Use functional components.
- Use hooks properly.
- Keep components small & modular.
- Use consistent naming conventions.
