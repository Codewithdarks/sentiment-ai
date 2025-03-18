import React, { useState, useContext } from 'react';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaSearch,
  FaBookmark,
  FaTag,
  FaHashtag,
  FaUserCircle,
  FaTwitter,
  FaMoon,
  FaSun,
  FaBell
} from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  // When the user clicks "Logout"
  const handleLogout = () => {
    setUserMenuOpen(false);
    logout();
    navigate('/login');
  };

  // Toggle between dark and light mode
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  // Navigation links in the sidebar
  const navLinks = [
    { label: 'Dashboard', icon: FaHome, to: '/dashboard' },
    { label: 'Sentiment Search', icon: FaSearch, to: '/search' },
    { label: 'Saved Entities', icon: FaBookmark, to: '/saved' },
    { label: 'Trending Categories', icon: FaTag, to: '/categories' },
    { label: 'Trending Hashtags', icon: FaHashtag, to: '/hashtags' },
    { label: 'Twitter', icon: FaTwitter, to: '/twitter' },
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} flex h-screen transition-colors`}>
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full ${
          darkMode ? 'bg-gray-900' : 'bg-gray-900'
        } text-white transition-transform transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 w-64 z-20`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <span className="text-xl font-bold tracking-wide">MyApp</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-2 px-4">
          {navLinks.map(({ label, icon: Icon, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={label}
                to={to}
                className={`flex items-center gap-2 py-2 px-2 rounded text-gray-200 
                  hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-700' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header
          className={`${
            darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
          } shadow-md h-14 flex items-center justify-between px-4 relative transition-colors`}
        >
          {/* Hamburger (mobile) */}
          <button
            className="md:hidden p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>
          <h1 className="hidden md:block font-bold">
            Sentiment Analysis Dashboard
          </h1>

          {/* Right side: Alert Icon, Dark Mode Toggle & User Menu */}
          <div className="flex items-center space-x-4">
            {/* Alert Icon with Notification Badge */}
            <div className="relative">
              <button
                className="relative p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 hover:bg-gray-200 transition-colors"
                title="Alerts"
              >
                <FaBell className="text-gray-700" />
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full text-center">
                  3
                </span>
              </button>
            </div>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={handleDarkModeToggle}
              className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 hover:bg-gray-200 transition-colors"
              title="Toggle Dark Mode"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* User Menu Trigger */}
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-1 hover:text-gray-500 focus:outline-none"
            >
              <FaUserCircle size={20} />
              <span className="hidden sm:inline text-sm">
                {user?.username || 'Admin'}
              </span>
            </button>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <div
                className={`absolute right-4 top-12 w-48 ${
                  darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'
                } rounded shadow-md py-2 z-30`}
              >
                <div className="px-4 py-2 border-b text-sm">
                  <p className="font-medium">{user?.username || 'User'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'No email'}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
