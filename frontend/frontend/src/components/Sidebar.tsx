import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Users, BookOpen, Award, BarChart3, LogOut } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: BarChart3, path: '/' },
    { name: 'Students', icon: Users, path: '/students' },
    { name: 'Class Streams', icon: BookOpen, path: '/classes' },
    { name: 'Subjects', icon: BookOpen, path: '/subjects' },
    { name: 'Assessment & Scoring', icon: Award, path: '/assessments' },
    { name: 'Reports', icon: BarChart3, path: '/reports' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Dark Blue Sidebar - Matching Figma */}
      <div className="w-64 bg-[#1e3a8a] text-white flex flex-col">
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-[#1e3a8a] font-bold text-2xl">I</div>
            <div>
              <div className="font-semibold text-xl tracking-tight">Ikonex</div>
              <div className="text-sm text-blue-300 -mt-1">Academy</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <a
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-sm transition-colors ${isActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-800 text-blue-100'}`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>

        <div className="p-4 border-t border-blue-800 mt-auto">
          <div className="px-4 py-3 bg-blue-800 rounded-lg mb-4">
            <div className="font-medium">Admin User</div>
            <div className="text-xs text-blue-300">admin@ikonex.com</div>
          </div>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-red-300 hover:bg-blue-800 rounded-lg text-sm">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
