'use client'; // Directive for Next.js

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import axios from 'axios'; // Import axios for API calls
import SecureStorage from 'react-secure-storage'; // Import react-secure-storage


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login success
  const router = useRouter(); // Initialize useRouter

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call the login API
      const response = await axios.post('http://localhost:4000/auth/login', {
        email,
        password,
      });

      // Extract token from response
      console.log("token",response)
      const { accessToken ,role} = response.data;

      // Store token in secure storage
      SecureStorage .setItem('accessToken', accessToken);
      SecureStorage .setItem('id', role);
      // Set login success state
      setIsLoggedIn(true);

      // Redirect to dashboard
      router.push("/pages/Dashboard");
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (e.g., show an error message)
    }
  };

  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="text-center mb-6">
          {/* Replace with the actual logo */}
          <img src="../img/ujslogo.png" alt="Logo" className="mx-auto h-10 mb-2" />
          <h1 className="text-xl font-semibold">Sign In</h1>
        </div>
        {isLoggedIn ? (
          <p className="text-green-500 font-bold text-center mb-4">Login successful!</p>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gray-700 text-white font-bold rounded-md transition"
            >
              LOGIN NOW
            </button>
          </form>
        )}
        <button
          type="button"
          onClick={handleBack}
          className="mt-4 w-full py-2 bg-white text-black font-bold rounded-md transition"
        >
          BACK NOW
        </button>
      </div>
    </div>
  );
};

export default Login;
