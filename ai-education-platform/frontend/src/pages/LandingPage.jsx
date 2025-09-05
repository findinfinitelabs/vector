import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Sample learning paths (replace with backend data later)
  const learningPaths = [
    { id: '1', title: 'Becoming a Data Scientist with AI', status: 'Start' },
    { id: '2', title: 'AI Governance and Data Quality Management', status: 'Continue' },
    { id: '3', title: 'Using AI for App Development and Automation', status: 'Locked' },
  ];

  // Simulated progress (replace with real data from backend later)
  const progress = 40;

  if (!user) {
    navigate('/'); // Redirect to login if not authenticated
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user.email}!
        </h1>
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Your Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <div
              className="bg-primary h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{progress}% Complete</p>
        </div>
        <h2 className="text-lg font-semibold mb-4">Learning Paths</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {learningPaths.map((path) => (
            <div
              key={path.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-md font-medium">{path.title}</h3>
                <p className="text-sm text-gray-600">Status: {path.status}</p>
              </div>
              <button
                onClick={() => navigate(`/path/${path.id}`)}
                className={`px-4 py-2 rounded-md text-white ${
                  path.status === 'Locked'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary hover:bg-opacity-90'
                }`}
                disabled={path.status === 'Locked'}
              >
                {path.status}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;