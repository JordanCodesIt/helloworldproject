'use client'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import validator from 'validator';





const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    setMessage('');
    let valid = true;

    if (!username || username.length < 3) {
      setUsernameError('Username must be at least 3 characters long.');
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[\x20-\x7E]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long and include both letters and numbers.');
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      valid = false;
    }

    if (!valid) return;


    const cred = { username, email, password };
  
    try {
      const response = await axios.post('http://localhost:3001/register', cred);
  
      
      setMessage(response.data.message);
  
      if (response.status === 201) {
        setUsername('');
        setEmail('');
        setPassword('');
        setMessage('User registered successfully');
      }
    }  catch (error: any) {
      console.log(error.response.data);

    }

  

    
  
  };
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-color">
      <div className="w-full max-w-md p-8 space-y-6 bg-black rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-primary text-center">Sign Up</h1>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium ">Username:{usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}</label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-secondary-color focus:border-secondary-color"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium ">Email: {emailError && <p className="text-red-500 text-sm">{emailError}</p>}</label>
            <Input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-secondary-color focus:border-secondary-color"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium ">Password:{passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}</label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-secondary-color focus:border-secondary-color"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium ">Confirm Password: {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}</label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-secondary-color focus:border-secondary-color"
            />
          </div>
          <Button type="submit" className="w-full px-4 py-2 font-medium bg-accent rounded-md hover:bg-secondary-color-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-color" >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;