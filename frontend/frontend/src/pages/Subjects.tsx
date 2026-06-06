import { useEffect, useState } from "react";
import subjectService from "../services/subjectService";
import classStreamService from "../services/classStreamService";

const Subjects = () => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [streams, setStreams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [subData, streamData] = await Promise.all([
        subjectService.getAll(),
        classStreamService.getAll()
      ]);
      setSubjects(subData);
      setStreams(streamData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Subject Management</h1>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Add New Subject
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">All Subjects</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Subject Name</th>
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
                    <button className="text-blue-600 hover:underline mr-4">Edit</button>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
