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
    <div className="bg-light min-vh-100">
      <Navbar />
      <div className="container py-5">
        <h1 className="display-6 mb-4">Welcome, {user.email}!</h1>
        <div className="mb-5">
          <h2 className="h5">Your Progress</h2>
          <div className="progress mt-2" style={{height: '20px'}}>
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {progress}%
            </div>
          </div>
        </div>
        <h2 className="h5 mb-4">Learning Paths</h2>
        <div className="row g-4">
          {learningPaths.map((path) => (
            <div key={path.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h3 className="h6">{path.title}</h3>
                    <p className="text-muted small">Status: {path.status}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/path/${path.id}`)}
                    className={`btn ${
                      path.status === 'Locked'
                        ? 'btn-secondary disabled'
                        : 'btn-primary'
                    } mt-3`}
                    disabled={path.status === 'Locked'}
                  >
                    {path.status}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;