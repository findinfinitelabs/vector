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
    <nav className="bg-primary p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/landing" className="text-xl font-bold">
          AI Education Platform
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/landing" className="hover:underline">
                Home
              </Link>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
              <Link to="/config" className="hover:underline">
                Config
              </Link>
              <button
                onClick={handleLogout}
                className="hover:underline focus:outline-none"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;