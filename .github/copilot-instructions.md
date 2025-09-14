# Copilot Instructions for AI Education Platform

## Project Overview
- **Architecture:**
  - Monorepo with `frontend/` (React SPA), `backend/` (Node.js API), and `features/` (BDD Gherkin specs).
  - Data flows from React frontend to Node.js backend via REST API endpoints (see `backend/src/server.js`).
  - BDD specs in `features/` guide development and testing of user-facing features.

## Key Workflows
- **Frontend:**
  - Install dependencies: `cd frontend && npm install`
  - Start dev server: `npm start` (runs on default React port)
  - Main entry: `src/index.jsx`, root component: `src/App.jsx`
  - Context pattern: see `src/context/AuthContext.jsx` for authentication state management.
  - Pages: `src/pages/` (Landing, LearningPath, Login, Profile)
  - Styles: `src/styles/index.css`

- **Backend:**
  - Install dependencies: `cd backend && npm install`
  - Start server: `node src/server.js`
  - API routes/controllers: `src/routes/`, `src/controllers/`
  - Models: `src/models/` (expand as needed)

- **BDD Testing:**
  - Feature specs: `features/*.feature` (Gherkin syntax)
  - Use these files to drive acceptance criteria and test automation.

## Conventions & Patterns
- **Frontend:**
  - Use React context for global state (see `AuthContext.jsx`).
  - Page components live in `src/pages/`, each page is a route.
  - Asset management: `src/assets/` for images, icons, etc.
  - Prefer functional components and hooks.

- **Backend:**
  - Organize logic into controllers, models, and routes.
  - API endpoints should follow RESTful conventions.

- **Testing:**
  - Write Gherkin feature files for new features before implementation.
  - Keep feature specs up to date with code changes.

## Integration Points
- **Frontend <-> Backend:**
  - Communicate via REST API (expand backend endpoints as features grow).
  - Example: Auth flows use context in frontend and corresponding routes in backend.

## External Dependencies
- **Frontend:** React, React Router, (add others as needed)
- **Backend:** Express (add others as needed)

## Examples
- To add a new page: create `src/pages/NewPage.jsx`, add route in `App.jsx`.
- To add a backend endpoint: create controller in `src/controllers/`, route in `src/routes/`, and update `server.js`.
- To add a feature spec: create `features/new-feature.feature` using Gherkin.

---

**Update this file as project structure or conventions evolve.**
