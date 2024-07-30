// Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/RegisterPage';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Register" element={<RegisterPage />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
