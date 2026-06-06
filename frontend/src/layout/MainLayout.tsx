import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
