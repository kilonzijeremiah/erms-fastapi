import React, { useState } from 'react';
import { Plus, Download, Search, User } from 'lucide-react';

const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const students = [
    { id: "547030", name: "Cody Fisher", email: "cody.fisher@example.com", class: "Form 3A", gender: "Female" },
    { id: "547031", name: "John Doe", email: "john.doe@example.com", class: "Form 2B", gender: "Male" },
    { id: "547032", name: "Sarah Wilson", email: "sarah.w@example.com", class: "Form 1A", gender: "Female" },
    // Add more dummy data as needed
  ];

  return (
    <div className="flex h-full gap-6">
      {/* Main Content - Students Table */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Top Bar */}
        <div className="border-b p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold">Students</h2>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download size={18} />
              Export CSV
            </button>
            <button className="flex items-center gap-2 bg-[#1e3a8a] text-white px-5 py-2.5 rounded-lg hover:bg-blue-800">
              <Plus size={18} />
              Add Student
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-6 border-b">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for a student by name or email"
              className="w-full pl-11 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-4 px-6 font-medium text-gray-500">Student ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-500">Email address</th>
                <th className="text-left py-4 px-6 font-medium text-gray-500">Class</th>
                <th className="text-left py-4 px-6 font-medium text-gray-500">Gender</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr 
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`border-b hover:bg-blue-50 cursor-pointer transition ${selectedStudent?.id === student.id ? 'bg-blue-50' : ''}`}
                >
                  <td className="py-4 px-6 font-medium">{student.id}</td>
                  <td className="py-4 px-6 text-gray-600">{student.email}</td>
                  <td className="py-4 px-6">{student.class}</td>
                  <td className="py-4 px-6">{student.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Detail Panel */}
      {selectedStudent && (
        <div className="w-96 bg-white rounded-2xl shadow-sm p-6 flex-shrink-0">
          <div className="flex justify-end">
            <button onClick={() => setSelectedStudent(null)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>

          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden mb-4">
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Student" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-xl">{selectedStudent.name}</h3>
            <p className="text-gray-500">Science student</p>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Student ID</p>
              <p className="font-mono text-lg">{selectedStudent.id}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Email</p>
              <p>{selectedStudent.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Class</p>
                <p className="font-medium">{selectedStudent.class}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Gender</p>
                <p className="font-medium">{selectedStudent.gender}</p>
              </div>
            </div>

            {/* You can add more fields later */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
