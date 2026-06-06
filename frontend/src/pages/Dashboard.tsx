import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import studentService from "../services/studentService";
import classStreamService from "../services/classStreamService";

export default function Dashboard() {
  const { user } = useAuth();
  const [students, setStudents] = useState<any[]>([]);
  const [streams, setStreams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [studentsData, streamsData] = await Promise.all([
        studentService.getAllStudents(),
        classStreamService.getAll()
      ]);
      setStudents(studentsData);
      setStreams(streamsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalStudents = students.length;
  const totalStreams = streams.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, <span className="font-semibold">{user?.name || user?.email}</span>
          </p>
        </div>
        <div className="text-right text-sm text-gray-500">
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total Students</p>
          <p className="text-5xl font-bold text-blue-600 mt-3">{totalStudents}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Class Streams</p>
          <p className="text-5xl font-bold text-indigo-600 mt-3">{totalStreams}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Active Today</p>
          <p className="text-5xl font-bold text-emerald-600 mt-3">—</p>
          <p className="text-xs text-gray-500 mt-1">More metrics coming soon</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Add Student */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6">Register New Student</h2>
          <StudentForm onSuccess={fetchData} />
        </div>

        {/* Recent Students */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Students</h2>
            <a href="/students" className="text-blue-600 hover:underline text-sm">View All →</a>
          </div>
          
          {loading ? (
            <p className="text-center py-10">Loading students...</p>
          ) : (
            <StudentTable students={students.slice(0, 6)} />
          )}
        </div>
      </div>
    </div>
  );
}
