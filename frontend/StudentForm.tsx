// frontend/src/components/StudentForm.tsx
import { useState } from "react";
import studentService from "../services/studentService";

interface Props {
  onSuccess?: () => void;
}

const StudentForm = ({ onSuccess }: Props) => {
  const [formData, setFormData] = useState({
    name: "", email: "", studentId: "", grade: "", age: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await studentService.createStudent(formData);
      setFormData({ name: "", email: "", studentId: "", grade: "", age: "" });
      onSuccess?.();
    } catch (err) {
      alert("Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <input type="text" placeholder="Full Name" required
        className="p-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500"
        value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />

      <input type="email" placeholder="Email Address" required
        className="p-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500"
        value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />

      <input type="text" placeholder="Student ID" required
        className="p-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500"
        value={formData.studentId} onChange={(e) => setFormData({...formData, studentId: e.target.value})} />

      <input type="text" placeholder="Grade / Class" required
        className="p-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500"
        value={formData.grade} onChange={(e) => setFormData({...formData, grade: e.target.value})} />

      <input type="number" placeholder="Age" required
        className="p-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500"
        value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />

      <button
        type="submit"
        disabled={loading}
        className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold hover:brightness-105 transition disabled:opacity-70"
      >
        {loading ? "Adding Student..." : "Add Student"}
      </button>
    </form>
  );
};

export default StudentForm;
