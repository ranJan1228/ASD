import React from 'react';
import { AuthForm } from '../components/AuthForm';
import type { AuthFormData } from '../types';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  const handleLogin = (data: AuthFormData) => {
    // Firebase implementation will go here
    console.log('Login:', data);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
}