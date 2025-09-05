# PowerShell script to create folder structure for AI Education Platform

# Define project root
$projectRoot = "./ai-education-platform"

# Create main project directory
New-Item -ItemType Directory -Path $projectRoot -Force | Out-Null

# Create frontend folder structure (React app)
$frontendPath = "$projectRoot/frontend"
New-Item -ItemType Directory -Path $frontendPath -Force | Out-Null
New-Item -ItemType Directory -Path "$frontendPath/src" -Force | Out-Null
New-Item -ItemType Directory -Path "$frontendPath/src/components" -Force | Out-Null
New-Item -ItemType Directory -Path "$frontendPath/src/pages" -Force | Out-Null
New-Item -ItemType Directory -Path "$frontendPath/src/context" -Force | Out-Null
New-Item -ItemType Directory -Path "$frontendPath/src/styles" -Force | Out-Null
New-Item -ItemType Directory -Path "$frontendPath/src/assets" -Force | Out-Null
New-Item -ItemType Directory -Path "$frontendPath/public" -Force | Out-Null

# Create placeholder React files
Set-Content -Path "$frontendPath/src/index.jsx" -Value @"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
"@

Set-Content -Path "$frontendPath/src/App.jsx" -Value @"
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import LearningPathPage from './pages/LearningPathPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/path/:pathId" element={<LearningPathPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
"@

Set-Content -Path "$frontendPath/src/pages/LoginPage.jsx" -Value @"
import React from 'react';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { login } = useAuth();
  return <div className="container mx-auto p-4">Login Page Placeholder</div>;
}

export default LoginPage;
"@

Set-Content -Path "$frontendPath/src/pages/LandingPage.jsx" -Value @"
import React from 'react';

function LandingPage() {
  return <div className="container mx-auto p-4">Landing Page Placeholder</div>;
}

export default LandingPage;
"@

Set-Content -Path "$frontendPath/src/pages/ProfilePage.jsx" -Value @"
import React from 'react';

function ProfilePage() {
  return <div className="container mx-auto p-4">Profile Page Placeholder</div>;
}

export default ProfilePage;
"@

Set-Content -Path "$frontendPath/src/pages/LearningPathPage.jsx" -Value @"
import React from 'react';
import { useParams } from 'react-router-dom';

function LearningPathPage() {
  const { pathId } = useParams();
  return <div className="container mx-auto p-4">Learning Path {pathId} Placeholder</div>;
}

export default LearningPathPage;
"@

Set-Content -Path "$frontendPath/src/context/AuthContext.jsx" -Value @"
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
"@

# Create basic Tailwind CSS file
Set-Content -Path "$frontendPath/src/styles/index.css" -Value @"
/* Tailwind imports and global styles */
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
"@

# Create public index.html
Set-Content -Path "$frontendPath/public/index.html" -Value @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Education Platform</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
"@

# Create backend folder structure (Node.js placeholder)
$backendPath = "$projectRoot/backend"
New-Item -ItemType Directory -Path $backendPath -Force | Out-Null
New-Item -ItemType Directory -Path "$backendPath/src" -Force | Out-Null
New-Item -ItemType Directory -Path "$backendPath/src/models" -Force | Out-Null
New-Item -ItemType Directory -Path "$backendPath/src/routes" -Force | Out-Null
New-Item -ItemType Directory -Path "$backendPath/src/controllers" -Force | Out-Null

# Create placeholder backend file
Set-Content -Path "$backendPath/src/server.js" -Value @"
// Placeholder for Node.js server
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
"@

# Create feature files folder for Gherkin
$featuresPath = "$projectRoot/features"
New-Item -ItemType Directory -Path $featuresPath -Force | Out-Null

# Create Gherkin feature files
Set-Content -Path "$featuresPath/auth.feature" -Value @"
Feature: User Authentication
  As a user with zero AI knowledge
  I want to securely log in to the app
  So that I can access personalized learning content

  Scenario: Successful login with email and password
    Given the user is on the login page
    When the user enters valid email and password
    And clicks the login button
    Then the user is redirected to the landing page
    And a session token is stored
"@

Set-Content -Path "$featuresPath/landing.feature" -Value @"
Feature: Landing Page
  As a logged-in user
  I want to see an overview of learning paths and my progress
  So that I can start or continue my AI education journey

  Scenario: Personalized landing page for logged-in user
    Given the user is logged in
    When the user navigates to the landing page
    Then they see their progress bar
    And a list of available learning paths with status (e.g., Start, Continue, Locked)
    And personalized greetings
"@

Set-Content -Path "$featuresPath/profile.feature" -Value @"
Feature: Account Profile Page
  As a logged-in user
  I want to view and edit my profile
  So that I can manage my details and see achievements

  Scenario: Viewing profile details
    Given the user is logged in and on the profile page
    When the page loads
    Then user details (name, email) are displayed
    And earned points, badges, and progress summaries are shown
"@

Set-Content -Path "$featuresPath/learning_paths.feature" -Value @"
Feature: Learning Paths
  As a beginner user
  I want structured learning paths
  So that I can build AI skills step-by-step

  Scenario: Completing a module activity
    Given the user is in a module
    When they complete an activity (e.g., quiz)
    And submit correct answers
    Then points are awarded
    And progress is updated
    And the next module unlocks
"@

Set-Content -Path "$featuresPath/gamification.feature" -Value @"
Feature: Interactivity and Gamification
  As a user
  I want interactive elements and rewards
  So that learning is engaging and motivating

  Scenario: Participating in an interactive activity
    Given the user is in a module
    When they engage in an activity (e.g., AI prompting exercise)
    Then real-time feedback is provided
    And on success, points are added
"@

# Create root-level files
Set-Content -Path "$projectRoot/README.md" -Value @"
# AI Education Platform
A React-based web application for teaching AI to beginners.

## Setup
1. Navigate to `frontend/` and run `npm install` to install dependencies.
2. Run `npm start` to launch the React app.
3. For backend, navigate to `backend/` and run `npm install`, then `node src/server.js`.

## Folder Structure
- `frontend/`: React SPA with components, pages, and context.
- `backend/`: Node.js API (placeholder).
- `features/`: Gherkin feature files for BDD testing.
"@

# Create package.json for frontend
Set-Content -Path "$frontendPath/package.json" -Value @"
{
  "name": "ai-education-platform",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.4.0",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "react-scripts": "^5.0.0"
  }
}
"@

# Create package.json for backend
Set-Content -Path "$backendPath/package.json" -Value @"
{
  "name": "ai-education-backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node src/server.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
"@

# Output success message
Write-Host "Project folder structure created successfully at $projectRoot"