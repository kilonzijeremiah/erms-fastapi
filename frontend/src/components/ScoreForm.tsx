import { useEffect, useState } from "react";
import scoreService from "../services/scoreService";
import studentService from "../services/studentService";
import subjectService from "../services/subjectService";

export default function ScoreForm({ onSuccess }: { onSuccess: () => void }) {
  const [students, setStudents] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  const [form, setForm] = useState({
    studentId: "",
    subjectId: "",
    marks: ""
  });

  useEffect(() => {
    studentService.getAll().then(setStudents);
    subjectService.getAll().then(setSubjects);
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      studentId: Number(form.studentId),
      subjectId: Number(form.subjectId),
      marks: Number(form.marks),
    };

    await scoreService.create(payload);

    setForm({ studentId: "", subjectId: "", marks: "" });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border space-y-2 rounded">

      {/* STUDENT */}
      <select
        name="studentId"
        value={form.studentId}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="">Select Student</option>
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* SUBJECT */}
      <select
        name="subjectId"
        value={form.subjectId}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="">Select Subject</option>
        {subjects.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* MARKS */}
      <input
        name="marks"
        type="number"
        placeholder="Marks"
        value={form.marks}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <button className="bg-green-600 text-white px-4 py-2">
        Save Score
      </button>
    </form>
  );
}
