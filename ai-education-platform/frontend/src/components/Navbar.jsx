import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to="/landing" className="navbar-brand">
            AI Education Platform
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link to="/landing" className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/config" className="nav-link">Config</Link>
                  </li>
                  <li className="nav-item">
                    <button onClick={handleLogout} className="btn btn-link nav-link" style={{color: 'white'}}>Logout</button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/" className="nav-link">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;