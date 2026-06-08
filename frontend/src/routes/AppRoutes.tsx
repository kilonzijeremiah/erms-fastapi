import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import ClassStreams from "../pages/ClassStreams";
import Subjects from "../pages/Subjects";
import Scores from "../pages/Scores";
import Reports from "../pages/Reports";
import StudentDetails from "../pages/StudentDetails";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layout/MainLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="students/:id" element={<StudentDetails />} />
        <Route path="class-streams" element={<ClassStreams />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="scores" element={<Scores />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
