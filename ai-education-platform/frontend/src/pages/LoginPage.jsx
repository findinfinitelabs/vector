import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in both email and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Login failed');
      }
      const data = await response.json();
      login(data.user); // Update AuthContext with user data
      navigate('/landing');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in both email and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Registration failed');
      }
      setError('Registration successful! Please log in.');
      setIsRegisterMode(false);
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  const handleGoogleLogin = () => {
    setError('Google login not implemented yet');
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow w-100" style={{ maxWidth: 400 }}>
        <div className="card-body">
          <h1 className="card-title text-center mb-4">AI Education Platform</h1>
          <h2 className="card-subtitle mb-3 text-center">
            {isRegisterMode ? 'Register' : 'Login'}
          </h2>
          <form onSubmit={isRegisterMode ? handleRegister : handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter your email"
                aria-required="true"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter your password"
                aria-required="true"
              />
            </div>
            {error && (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            )}
            <button type="submit" className="btn btn-primary w-100">
              {isRegisterMode ? 'Register' : 'Login'}
            </button>
          </form>
          <div className="mt-3 text-center">
            <p className="small">
              {isRegisterMode ? 'Already have an account?' : 'Need an account?'}
              <button
                type="button"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="btn btn-link btn-sm"
              >
                {isRegisterMode ? 'Login' : 'Register'}
              </button>
            </p>
            <p className="small mt-2">Or sign in with</p>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-outline-secondary w-100 mt-2"
            >
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;