import { useEffect, useState } from "react";
import subjectService from "../services/subjectService";

const Subjects = () => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [newSubject, setNewSubject] = useState({ name: "", code: "" });
  const [loading, setLoading] = useState(true);

  const fetchSubjects = async () => {
    try {
      const data = await subjectService.getAll();
      setSubjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.name || !newSubject.code) return;
    try {
      await subjectService.create(newSubject);
      setNewSubject({ name: "", code: "" });
      fetchSubjects();
    } catch (err) {
      alert("Failed to create subject");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Subjects Management</h1>

      {/* Add New Subject */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Add New Subject</h2>
        <form onSubmit={handleCreate} className="flex gap-4">
          <input
            type="text"
            placeholder="Subject Name"
            className="flex-1 p-3 border rounded-lg"
            value={newSubject.name}
            onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Subject Code"
            className="flex-1 p-3 border rounded-lg"
            value={newSubject.code}
            onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
          />
          <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg">Add Subject</button>
        </form>
      </div>

      {/* Subjects List */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">All Subjects</h2>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Code</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="px-6 py-4">{s.name}</td>
                <td className="px-6 py-4 font-mono">{s.code}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 mr-4">Edit</button>
                  <button className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subjects;
