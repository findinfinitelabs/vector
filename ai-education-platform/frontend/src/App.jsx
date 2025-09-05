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
