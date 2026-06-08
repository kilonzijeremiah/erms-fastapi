import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Ikonex Academy</h1>
        <p>Backend is fixed. Frontend routing will be restored soon.</p>
        <p>Current commit: Check your GitHub</p>
      </div>
    </Router>
  );
};

export default App;
