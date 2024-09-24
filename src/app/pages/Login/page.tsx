'use client'; // Directive for Next.js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import axios from 'axios'; // Import axios for API calls
import SecureStorage from 'react-secure-storage'; // Import react-secure-storage
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize useRouter

  // Function to handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call the login API
      const response = await axios.post('http://localhost:4000/auth/login', {
        email,
        password,
      });
      if (response.data.status === 200) {
        toast.success('Login Sussessfully!');
       
      } else {
        // If the response indicates failure, show the error message
        toast.error(`Error: ${response.data.message || 'Something went wrong!'}`);
      }
      // Extract token and role from response
      const { accessToken, role } = response.data;
      SecureStorage.setItem('accessToken', accessToken);
      SecureStorage.setItem('id', role);
      setTimeout(() => {
        SecureStorage.removeItem('accessToken');
        SecureStorage.removeItem('id');
        SecureStorage.removeItem('permission');
        router.push('/'); // Redirect to login page
      }, 30*60*1000); // 1 minute (60000 milliseconds)

      // Redirect to dashboard
      router.push("/pages/Dashboard");
    }catch (error: any) {
      console.error("Error submitting form:", error);

      // Check if the error has a response (server error)
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data.message || 'Request failed!'}`);
      } else {
        // Handle other errors (e.g., network issues)
        toast.error('An error occurred while submitting the form.');
      }
    }
  };


  return (<>
    <ToastContainer/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="text-center mb-6">
          <img src="../img/ujslogo.png" alt="Logo" className="mx-auto h-10 mb-2" />
          <h1 className="text-xl font-semibold">Sign In</h1>
        </div>
       
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
    
       
      </div>
    </div></>
  );
};

export default Login;
