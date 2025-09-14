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
    <div className="bg-light min-vh-100">
      <Navbar />
      <div className="container py-5">
        <h1 className="display-6 mb-4">Account Profile</h1>
        <div className="card mb-4 shadow-sm">
          <div className="card-body d-flex align-items-center mb-4">
            <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center me-4" style={{width: '64px', height: '64px'}}></div> {/* Placeholder profile picture */}
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control form-control-lg mb-2"
                />
              ) : (
                <h2 className="h4 mb-1">{name}</h2>
              )}
              <p className="text-muted mb-0">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="btn btn-primary"
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
        </div>
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h2 className="h5 mb-3">Achievements</h2>
            <p className="fs-5 mb-2">Points: {points}</p>
            <h3 className="h6 mb-2">Badges:</h3>
            <ul className="ps-3">
              {badges.map((badge, index) => (
                <li key={index}>{badge}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="h5 mb-3">Progress Summary</h2>
            {progressSummaries.map((summary, index) => (
              <div key={index} className="mb-4">
                <p className="fw-bold mb-1">{summary.path}</p>
                <div className="progress" style={{height: '10px'}}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${summary.completion}%` }}
                    aria-valuenow={summary.completion}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
                <p className="text-muted small mt-1">{summary.completion}% Complete</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;