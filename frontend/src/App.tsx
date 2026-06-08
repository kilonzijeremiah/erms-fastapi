import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';  // Create this file next if it does not exist
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          {/* Add other routes later */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
