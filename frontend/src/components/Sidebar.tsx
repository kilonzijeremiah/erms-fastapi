import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: "250px", padding: "1rem", background: "#111", color: "#fff" }}>
        <h2>Ikonex Academy</h2>

        <nav style={{ marginTop: "1rem" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/students" style={{ color: "white", textDecoration: "none" }}>
                Students
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
