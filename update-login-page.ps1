# PowerShell script to update LoginPage.jsx and configure Tailwind CSS

# Define project root
$projectRoot = "./ai-education-platform"
$frontendPath = "$projectRoot/frontend"

# Verify project directory exists
if (-not (Test-Path $projectRoot)) {
  Write-Host "Error: Project directory $projectRoot not found. Please run the initial setup script first."
  exit
}

# Update LoginPage.jsx
Set-Content -Path "$frontendPath/src/pages/LoginPage.jsx" -Value @"
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password');
      return;
    }
    // Simulate backend login (replace with actual API call later)
    try {
      login({ email }); // Update AuthContext with user data
      navigate('/landing'); // Redirect to landing page
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleGoogleLogin = () => {
    // Placeholder for Google OAuth
    setError('Google login not implemented yet');
  };

  return (
    <div className=""min-h-screen flex items-center justify-center bg-gray-100"">
      <div className=""bg-white p-8 rounded-lg shadow-lg w-full max-w-md"">
        <h1 className=""text-3xl font-bold text-center text-blue-600 mb-6"">AI Education Platform</h1>
        <form onSubmit={handleSubmit} className=""space-y-4"">
          <div>
            <label htmlFor=""email"" className=""block text-sm font-medium text-gray-700"">
              Email
            </label>
            <input
              id=""email""
              type=""email""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=""mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500""
              placeholder=""Enter your email""
              aria-required=""true""
            />
          </div>
          <div>
            <label htmlFor=""password"" className=""block text-sm font-medium text-gray-700"">
              Password
            </label>
            <input
              id=""password""
              type=""password""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=""mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500""
              placeholder=""Enter your password""
              aria-required=""true""
            />
          </div>
          {error && (
            <p className=""text-red-500 text-sm"" role=""alert"">
              {error}
            </p>
          )}
          <button
            type=""submit""
            className=""w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200""
          >
            Login
          </button>
        </form>
        <div className=""mt-4 text-center"">
          <p className=""text-sm text-gray-600"">Or sign in with</p>
          <button
            onClick={handleGoogleLogin}
            className=""mt-2 w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition duration-200""
          >
            Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
"@

# Create tailwind.config.js
Set-Content -Path "$frontendPath/tailwind.config.js" -Value @"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#007BFF',
        accent: '#28A745',
      },
    },
  },
  plugins: [],
};
"@

# Update package.json to include Tailwind scripts
$packageJsonPath = "$frontendPath/package.json"
$packageJson = Get-Content -Path $packageJsonPath -Raw | ConvertFrom-Json
$packageJson.scripts.postinstall = "npx tailwindcss init"
$packageJson | ConvertTo-Json -Depth 4 | Set-Content -Path $packageJsonPath

# Output success message
Write-Host "LoginPage.jsx updated and Tailwind CSS configured successfully at $frontendPath"