import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Login from './pages/Login';
// import other pages as needed

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          {/* Add more routes here later */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
