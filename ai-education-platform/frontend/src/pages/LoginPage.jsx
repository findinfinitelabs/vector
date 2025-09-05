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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          AI Education Platform
        </h1>
        <h2 className="text-xl font-semibold text-center mb-4">
          {isRegisterMode ? 'Register' : 'Login'}
        </h2>
        <form onSubmit={isRegisterMode ? handleRegister : handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
              aria-required="true"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition duration-200"
          >
            {isRegisterMode ? 'Register' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isRegisterMode ? 'Already have an account?' : 'Need an account?'}
            <button
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="ml-1 text-primary hover:underline"
            >
              {isRegisterMode ? 'Login' : 'Register'}
            </button>
          </p>
          <p className="text-sm text-gray-600 mt-2">Or sign in with</p>
          <button
            onClick={handleGoogleLogin}
            className="mt-2 w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition duration-200"
          >
            Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;