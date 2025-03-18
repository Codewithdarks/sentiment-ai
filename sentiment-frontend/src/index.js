import React from 'react';
import ReactDOM from 'react-dom'; // Use render for compatibility
import './index.css'; // Tailwind/custom styles
import App from './App';
import AuthProvider from './components/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);