import { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import studentService from "../services/studentService";

export default function Students() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">All Students</h1>
        <span className="text-gray-500">{students.length} students</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add New Student Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-5">Register New Student</h2>
          <StudentForm onSuccess={fetchStudents} />
        </div>

        {/* Students Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-5">Students List</h2>
          {loading ? (
            <p className="text-center py-10">Loading students...</p>
          ) : (
            <StudentTable students={students} refresh={fetchStudents} />
          )}
        </div>
      </div>
    </div>
  );
}
