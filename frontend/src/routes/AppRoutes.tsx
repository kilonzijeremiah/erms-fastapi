import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import ClassStreams from "../pages/ClassStreams";
import Subjects from "../pages/Subjects";
import Scores from "../pages/Scores";
import Results from "../pages/Results";
import Reports from "../pages/Reports";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layout/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Students />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/class-streams"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ClassStreams />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/subjects"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Subjects />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/scores"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Scores />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Results />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Reports />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
