import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const Sidebar = ({ onSelectCategory, onSearch }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const categories = ['Politics', 'Sports', 'Movies', 'Tech', 'Products'];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col fixed">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Sentiment Analysis
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {/* <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-700">Dashboard</Link> */}
        <Link to="/Twitter" className="block p-2 rounded hover:bg-gray-700">Twitter</Link>
        {/* <Link to="#" className="block p-2 rounded hover:bg-gray-700">Settings</Link> */}

        {/* Dropdown for Trending Categories */}
        <div className="mt-4">
          <label className="block text-sm text-gray-300">Trending Categories</label>
          <select
            className="w-full p-2 mt-1 text-gray-800 rounded bg-white focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              onSelectCategory(e.target.value);
            }}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sentiment Search Input */}
        <div className="mt-4">
          <label className="block text-sm text-gray-300">Search Sentiment</label>
          <input
            type="text"
            className="w-full p-2 mt-1 text-gray-800 rounded bg-white focus:ring-2 focus:ring-blue-500"
            placeholder="Search for a topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={() => onSearch(searchQuery)}
            className="w-full mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
