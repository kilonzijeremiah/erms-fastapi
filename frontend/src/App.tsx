import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Users, BookOpen, Award, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const navItems = [
    { name: 'Dashboard', icon: BarChart3, path: '/' },
    { name: 'Students', icon: Users, path: '/students' },
    { name: 'Class Streams', icon: BookOpen, path: '/classes' },
    { name: 'Subjects', icon: BookOpen, path: '/subjects' },
    { name: 'Assessments', icon: Award, path: '/assessments' },
    { name: 'Reports', icon: BarChart3, path: '/reports' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#1e3a8a] text-white transition-transform duration-300`}>
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1e3a8a] font-bold text-xl">I</div>
            <div>
              <h1 className="font-semibold text-xl">Ikonex Academy</h1>
              <p className="text-xs text-blue-300">Student Management</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={() => setActiveItem(item.name.toLowerCase())}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${activeItem === item.name.toLowerCase() ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>

        <div className="absolute bottom-6 px-6 w-full">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-red-300 hover:bg-blue-800 rounded-lg">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search students, classes..."
                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2.5 px-4 pl-10 focus:outline-none focus:border-blue-500"
              />
              <div className="absolute left-3.5 top-3 text-gray-400">🔍</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900">🛎️</button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-medium text-sm">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">AU</div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
