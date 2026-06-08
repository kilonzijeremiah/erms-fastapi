import { useEffect, useState } from "react";
import studentService from "../services/studentService";
import classStreamService from "../services/classStreamService";

export default function StudentForm({ onSuccess }: { onSuccess: () => void }) {
  const [streams, setStreams] = useState<any[]>([]);

  const [form, setForm] = useState({
    name: "",
    admissionNumber: "",
    classStreamId: ""
  });

  useEffect(() => {
    const loadStreams = async () => {
      try {
        const data = await classStreamService.getAll();
        setStreams(data);
      } catch (err) {
        console.error("Failed to load class streams", err);
      }
    };

    loadStreams();
  }, []);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await studentService.create({
      ...form,
      classStreamId: Number(form.classStreamId)
    });

    setForm({
      name: "",
      admissionNumber: "",
      classStreamId: ""
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded">
      
      {/* NAME */}
      <input
        name="name"
        placeholder="Student Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      {/* ADMISSION */}
      <input
        name="admissionNumber"
        placeholder="Admission Number"
        value={form.admissionNumber}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      {/* CLASS STREAM DROPDOWN */}
      <select
        name="classStreamId"
        value={form.classStreamId}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="">Select Class Stream</option>

        {streams.map((stream) => (
          <option key={stream.id} value={stream.id}>
            {stream.name}
          </option>
        ))}
      </select>

      {/* SUBMIT */}
      <button className="bg-blue-600 text-white px-4 py-2">
        Add Student
      </button>
    </form>
  );
}
