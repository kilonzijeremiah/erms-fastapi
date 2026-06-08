import { useState, useEffect } from "react";
import studentService, { Student } from "../services/studentService";
import classStreamService, { ClassStream } from "../services/classStreamService";

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
  const [streams, setStreams] = useState<ClassStream[]>([]);

  useEffect(() => {
    setForm(student);
  }, [student]);

  useEffect(() => {
    const loadStreams = async () => {
      const data = await classStreamService.getAll();
      setStreams(data);
    };
    loadStreams();
  }, []);

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
      <div className="bg-white p-6 w-[420px] rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Student</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Student Name"
          />

          <input
            name="admissionNumber"
            value={form.admissionNumber}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Admission Number"
          />

          {/* CLASS STREAM DROPDOWN */}
          <select
            name="classStreamId"
            value={form.classStreamId}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Select Class Stream</option>

            {streams.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

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
