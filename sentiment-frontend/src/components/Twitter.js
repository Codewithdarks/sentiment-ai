import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import { AuthContext } from './AuthProvider';

const Twitter = () => {
  const [username, setUsername] = useState('');
  const [count, setCount] = useState(5);
  const [error, setError] = useState('');
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !user.token)) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Token:', user?.token);
    console.log('Request URL:', `${axios.defaults.baseURL}/sentiment/tweets/${username}?count=${count}`);
    console.log('Request Params:', { count });

    if (!username) {
      setError('Please enter a Twitter username.');
      return;
    }

    try {
      const res = await axios.get(`/sentiment/tweets/${username}`, {
        params: { count }
      });
      console.log('Response:', res.data);
      navigate('/result', { state: { tweets: res.data } });
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to fetch tweets.';
      console.error('Error Status:', err.response?.status);
      console.error('Error Message:', errorMsg);
      setError(errorMsg);
      alert(errorMsg);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Fetch Twitter Posts</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-gray-700">Twitter Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., amittiwari4069"
              />
            </div>
            <div>
              <label htmlFor="count" className="block text-gray-700">Number of Posts (5-100)</label>
              <input
                id="count"
                type="number"
                value={count}
                onChange={(e) => setCount(Math.max(5, Math.min(100, e.target.value)))}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                min="5"
                max="100"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
            >
              Fetch Posts
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Twitter;