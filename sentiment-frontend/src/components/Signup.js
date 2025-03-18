import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const Signup = () => {
  const [username, setUsername] = useState(''); // Username state
  const [password, setPassword] = useState(''); // Password state
  const [error, setError] = useState('');       // Error state
  const { signup } = useContext(AuthContext);   // Signup from context
  const navigate = useNavigate();               // Navigation hook

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    const result = await signup(username, password); // Call signup
    if (result.success) {
      navigate('/'); // Redirect on success
    } else {
      setError(result.message || 'Signup failed. Username may already exist.'); // Show error
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>} 
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup; // Export Signup component