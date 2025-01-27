'use client'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import axios from 'axios';
const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
        const response = await axios.post('http://localhost:3001/login', {
            email,                password
        });

        setMessage(response.data.message);
        
        if (response.status === 200) {
            setEmail('');
            setPassword('');
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            setMessage(error.response?.data?.message || 'Error logging in');
        } else {
            setMessage('An unexpected error occurred');
        }
    }
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md p-8 space-y-6 bg-black rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        <form onSubmit={ handleSignIn } className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium ">Email:</label>
            <Input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium ">Password:</label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
            <Button type="submit" className=" w-full px-4 py-2 font-medium text-white bg-primary text-bold rounded hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign In
            </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;