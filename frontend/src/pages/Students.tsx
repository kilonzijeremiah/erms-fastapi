import { useEffect, useState } from "react";
import studentService, { Student } from "../services/studentService";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getAll();
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Students</h1>

      <StudentForm onSuccess={fetchStudents} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <StudentTable students={students} onRefresh={fetchStudents} />
      )}
    </div>
  );
}
