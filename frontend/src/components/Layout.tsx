import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Users, BookOpen, Award, BarChart3, Settings, LogOut, Menu } from 'lucide-react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#1e3a8a] text-white transition-transform duration-300 flex flex-col`}>
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

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b flex items-center px-6 justify-between">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="lg:hidden text-gray-600"
          >
            <Menu size={24} />
          </button>

          <div className="flex-1 max-w-md px-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 pl-10 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div>Admin User</div>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
