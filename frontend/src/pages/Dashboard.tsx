import React from 'react';
import { Users, BookOpen, Award, TrendingUp, Plus } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, Admin User</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Monday, 8 June 2026</p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-4xl font-semibold text-gray-900 mt-2">248</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600 flex items-center gap-1">
            <TrendingUp size={16} /> +12 this month
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Class Streams</p>
              <p className="text-4xl font-semibold text-gray-900 mt-2">12</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-indigo-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600 flex items-center gap-1">
            <TrendingUp size={16} /> 3 new this term
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Teachers</p>
              <p className="text-4xl font-semibold text-gray-900 mt-2">28</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Award className="w-7 h-7 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600 flex items-center gap-1">
            <TrendingUp size={16} /> All active
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Performance</p>
              <p className="text-4xl font-semibold text-gray-900 mt-2">78.4%</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-emerald-600">+2.3% from last term</div>
        </div>
      </div>

      {/* Quick Actions & Recent Students */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Register New Student */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Plus size={20} /> Register New Student
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500" placeholder="Enter full name" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Gender</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Class Stream</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500">
                  <option value="">Select Class Stream</option>
                  <option value="Form 1A">Form 1A</option>
                  <option value="Form 1B">Form 1B</option>
                </select>
              </div>
            </div>

            <button className="w-full bg-[#1e3a8a] text-white py-3 rounded-lg hover:bg-blue-800 transition font-medium">
              Add Student
            </button>
          </div>
        </div>

        {/* Recent Students */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Recent Students</h3>
            <a href="/students" className="text-blue-600 hover:underline text-sm">View All →</a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium text-gray-500">Student ID</th>
                  <th className="text-left py-3 font-medium text-gray-500">Name</th>
                  <th className="text-left py-3 font-medium text-gray-500">Class</th>
                  <th className="text-left py-3 font-medium text-gray-500">Gender</th>
                  <th className="text-left py-3 font-medium text-gray-500">Date Added</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {/* Dummy data - will be dynamic later */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-3 font-mono text-gray-600">IKN240{i + 1}</td>
                    <td className="py-3">John Doe {i + 1}</td>
                    <td className="py-3">Form 2A</td>
                    <td className="py-3">Male</td>
                    <td className="py-3 text-gray-500">Today</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
