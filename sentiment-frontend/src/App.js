import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Twitter from './components/Twitter';
import Result from './components/Result';
import AuthProvider from './components/AuthProvider';
import TrendingHashtags from './components/TrendingHashtags';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/twitter" element={<Twitter />} />
          <Route path="/result" element={<Result />} />
          <Route path="/hashtags" element={<TrendingHashtags />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;