import React from 'react';
import { AuthForm } from '../components/AuthForm';
import type { AuthFormData } from '../types';
import { useNavigate } from 'react-router-dom';

export function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = (data: AuthFormData) => {
    // Firebase implementation will go here
    console.log('Sign up:', data);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <AuthForm type="signup" onSubmit={handleSignUp} />
    </div>
  );
}