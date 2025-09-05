import React from 'react';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { login } = useAuth();
  return <div className="container mx-auto p-4">Login Page Placeholder</div>;
}

export default LoginPage;
