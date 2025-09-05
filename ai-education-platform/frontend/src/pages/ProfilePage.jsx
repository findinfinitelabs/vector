import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('User Name'); // Simulated editable name
  const [isEditing, setIsEditing] = useState(false);
  const [points, setPoints] = useState(500); // Simulated points
  const [badges, setBadges] = useState(['Bronze Learner', 'AI Beginner']); // Simulated badges

  // Simulated progress summaries (replace with backend data later)
  const progressSummaries = [
    { path: 'Becoming a Data Scientist with AI', completion: 60 },
    { path: 'AI Governance and Data Quality Management', completion: 30 },
    { path: 'Using AI for App Development and Automation', completion: 0 },
  ];

  if (!user) {
    navigate('/'); // Redirect to login if not authenticated
    return null;
  }

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Send update to backend (e.g., PATCH /api/user)
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Account Profile</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div> {/* Placeholder profile picture */}
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-xl font-semibold border border-gray-300 p-1 rounded"
                />
              ) : (
                <h2 className="text-xl font-semibold">{name}</h2>
              )}
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-200"
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Achievements</h2>
          <p className="text-xl mb-2">Points: {points}</p>
          <h3 className="text-md font-medium mb-2">Badges:</h3>
          <ul className="list-disc pl-6">
            {badges.map((badge, index) => (
              <li key={index}>{badge}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Progress Summary</h2>
          {progressSummaries.map((summary, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{summary.path}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${summary.completion}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{summary.completion}% Complete</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;