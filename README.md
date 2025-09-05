# AI Education Platform

A React-based web application designed to teach AI concepts to users with zero prior knowledge through interactive, structured learning paths and gamified experiences.

## Project Design

### Overview

The application is a single-page application (SPA) built with React, utilizing React Router for navigation and Context API for state management (e.g., user authentication, progress tracking). The design prioritizes modularity, scalability, and beginner-friendly UX, with a clean, responsive interface styled using Tailwind CSS.

### Component Hierarchy

The app is structured with a modular component architecture:

- **App (Root)**: Entry point, wrapping the app in providers and routing.
  - **AuthProvider**: Context for managing user session state.
  - **Router**: Handles navigation with React Router.
    - **Public Routes**:
      - **LoginPage**: Authentication form for email/password or OAuth (e.g., Google).
    - **Protected Routes** (require authentication):
      - **LandingPage**: Displays learning paths overview and user progress.
      - **ProfilePage**: Shows user details, achievements, and progress summaries.
      - **LearningPathPage**: Renders dynamic learning paths with modules.
        - **ModuleComponent**: Hosts interactive activities (e.g., quizzes, coding tasks).
        - **RewardComponent**: Displays points, badges, and milestone animations.
  - **Shared Components**:
    - **Navbar**: Navigation bar with links to Home and Profile.
    - **ProgressBar**: Visual tracker for path/module completion.
    - **ActivityEditor**: Interface for quizzes, AI prompts, or code editors.

### UI/UX Principles

- **Theme**: Clean, modern aesthetic with a color scheme of blues (#007BFF) and greens (#28A745) to evoke trust and growth.
- **Layout**: Responsive grid system using Tailwind CSS, mobile-first design with vertical stacking on smaller screens.
- **Accessibility**: WCAG-compliant with ARIA labels, high-contrast text, and keyboard-navigable menus.
- **Simplicity**: Intuitive navigation and minimalistic design to reduce cognitive load for beginners.

### Wireframes


Below are markdown table mockups for key pages:

#### Login Page

| Element            | Description                |
|--------------------|---------------------------|
| App Logo           | Branding/logo at the top   |
| Email              | [Input field]              |
| Password           | [Input field]              |
| Login Button       | [Button]                   |
| Or Sign in with    | Text separator             |
| Google Button      | [Button for Google OAuth]  |

#### Landing Page (Logged In)

| Element           | Description                          |
|-------------------|--------------------------------------|
| Navbar            | Home | Profile navigation links        |
| Welcome, User!    | Greeting with username                |
| Progress Bar      | Visual progress indicator (e.g., 40%) |
| Learning Paths    | List of paths:                        |
|                   | - Path 1 [Start]                      |
|                   | - Path 2 [Continue]                   |
|                   | - Path 3 [Locked]                     |

#### Profile Page

| Element          | Description                      |
|------------------|----------------------------------|
| Navbar           | Navigation bar                   |
| Profile Picture  | User avatar                      |
| Name             | Editable name field              |
| Points           | User's points (e.g., 500)        |
| Badges           | Icons for earned achievements    |
| Progress Summary | Overview of learning progress    |


### Workflow and User Flows

The app follows a user-centric workflow:

#### Main Workflow

- **Unauthenticated**: Users see the LoginPage. On successful login, they are redirected to the LandingPage.
- **Authenticated**:
  - **LandingPage**: Displays personalized progress and available learning paths.
    - Select a path → Navigate to LearningPathPage.
    - View profile → Navigate to ProfilePage.
  - **LearningPathPage**: Users complete modules with activities (e.g., quizzes). Progress is saved, points are awarded, and milestones trigger rewards (e.g., badges, animations).
  - **Logout**: Clears session and redirects to LoginPage.

#### Detailed Flows

1. **Authentication**:
   - User enters credentials or uses OAuth → Backend validates → Stores session token → Redirects to LandingPage.
   - Error handling: Displays "Invalid credentials" for failed logins.
2. **Learning**:
   - Select a path → Load sequential modules → Complete activities → Earn points → Unlock next module.
   - Milestones award badges and unlock advanced content.
3. **Profile Management**:
   - View/edit user details (name, email) → Save to backend.
   - Display points, badges, and path progress summaries.

#### Error Handling

- Network errors: Show retry options or offline notices.
- Unauthorized access: Redirect to LoginPage.
- Progress saving: Auto-save on module completion to prevent data loss.

## Setup

1. Navigate to `frontend/` and run `npm install` to install dependencies.
2. Run `npm start` to launch the React app.
3. For backend, navigate to `backend/` and run `npm install`, then `node src/server.js`.

## Folder Structure

- `frontend/`: React SPA with components, pages, context, and styles.
- `backend/`: Node.js API (placeholder for authentication, progress storage).
- `features/`: Gherkin feature files for BDD testing with scenarios for authentication, landing page, profile, learning paths, and gamification.