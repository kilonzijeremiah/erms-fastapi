import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const token = localStorage.getItem("token");

  // ❌ NOT logged in → go login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // ✅ logged in → show real page
  return children;
}
