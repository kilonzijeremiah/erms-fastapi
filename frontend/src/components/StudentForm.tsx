import { useState } from "react";
import studentService from "../services/studentService";

export default function StudentForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    name: "",
    admissionNumber: "",
    classStreamId: 1
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await studentService.create(form);
    setForm({ name: "", admissionNumber: "", classStreamId: 1 });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded">
      <input
        name="name"
        placeholder="Student Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="admissionNumber"
        placeholder="Admission Number"
        value={form.admissionNumber}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="classStreamId"
        placeholder="Class Stream ID"
        value={form.classStreamId}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <button className="bg-blue-600 text-white px-4 py-2">
        Add Student
      </button>
    </form>
  );
}
