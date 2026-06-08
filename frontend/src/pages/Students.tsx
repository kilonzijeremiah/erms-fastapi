import { useEffect, useState } from "react";
import studentService, { Student } from "../services/studentService";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import StudentEditModal from "../components/StudentEditModal";

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

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

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsEditOpen(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Students</h1>

      <StudentForm onSuccess={fetchStudents} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <StudentTable
          students={students}
          onRefresh={fetchStudents}
          onEdit={handleEdit}
        />
      )}

      {isEditOpen && selectedStudent && (
        <StudentEditModal
          student={selectedStudent}
          onClose={() => setIsEditOpen(false)}
          onSuccess={() => {
            setIsEditOpen(false);
            fetchStudents();
          }}
        />
      )}
    </div>
  );
}
