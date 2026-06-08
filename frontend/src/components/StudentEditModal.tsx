import { useState, useEffect } from "react";
import studentService, { Student } from "../services/studentService";

export default function StudentEditModal({
  student,
  onClose,
  onSuccess
}: {
  student: Student;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState<Student>(student);

  useEffect(() => {
    setForm(student);
  }, [student]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await studentService.update(student.id!, form);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 w-[400px] rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Student</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            name="admissionNumber"
            value={form.admissionNumber}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            name="classStreamId"
            value={form.classStreamId}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-3 py-1"
            >
              Cancel
            </button>

            <button className="bg-green-600 text-white px-3 py-1">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
