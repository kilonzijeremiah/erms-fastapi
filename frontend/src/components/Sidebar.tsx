import React from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#1e3a8a] text-white flex flex-col">
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-[#1e3a8a] font-bold text-2xl">I</div>
            <div>
              <div className="font-semibold text-xl">Ikonex</div>
              <div className="text-sm text-blue-300">Academy</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <a href="/" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${location.pathname === '/' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}>
            Dashboard
          </a>
          <a href="/students" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${location.pathname === '/students' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}>
            Students
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-8">
          {/* Content will be loaded based on URL */}
          {location.pathname === '/' && <h1 className="text-3xl font-semibold">Dashboard</h1>}
          {location.pathname === '/students' && <h1 className="text-3xl font-semibold">Students</h1>}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
