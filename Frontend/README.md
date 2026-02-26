# 🎨 MediAI Frontend

This is the frontend application of MediAI.
Built using React (Vite).

---

## 📁 Folder Structure

```
backend
 ├── src
 │   ├── ai_models      → ML models / Python scripts
 │   ├── config         → DB config, cloud config, environment setup
 │   ├── controllers    → Request & response handling
 │   ├── middleware     → Auth, error handling, file uploads
 │   ├── services       → Core business logic & AI processing
 │   ├── uploads        → Temporary uploaded files
 │   └── utils          → Helper functions
 │
 ├── server.js          → Entry point
 ├── package.json       → Dependencies
 ├── .env               → Environment variables (not committed)
 └── .gitignore
```


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
