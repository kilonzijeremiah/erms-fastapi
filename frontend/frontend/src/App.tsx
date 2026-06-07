import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";

// Import your pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// ... other existing imports

// NEW: Import Teachers
import Teachers from './pages/Teachers';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes - wrap with your ProtectedRoute if you have one */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<YourStudentsPage />} />
          <Route path="/class-streams" element={<YourClassStreamsPage />} />
          <Route path="/subjects" element={<YourSubjectsPage />} />
          <Route path="/scores" element={<YourScoresPage />} />

          {/* NEW TEACHER ROUTE */}
          <Route path="/teachers" element={<Teachers />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
