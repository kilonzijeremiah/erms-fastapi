import { useEffect, useState } from "react";
import classStreamService from "../services/classStreamService";

const ClassStreams = () => {
  const [streams, setStreams] = useState<any[]>([]);
  const [newStream, setNewStream] = useState({ name: "", level: "", capacity: 40 });
  const [loading, setLoading] = useState(true);

  const fetchStreams = async () => {
    try {
      const data = await classStreamService.getAll();
      setStreams(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreams();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await classStreamService.create(newStream);
      setNewStream({ name: "", level: "", capacity: 40 });
      fetchStreams();
    } catch (err) {
      alert("Failed to create class stream");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Class Streams Management</h1>

      {/* Add New Stream */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Create New Class Stream</h2>
        <form onSubmit={handleCreate} className="flex gap-4">
          <input
            type="text"
            placeholder="Class Name (e.g. Form 1A)"
            className="flex-1 p-3 border rounded-lg"
            value={newStream.name}
            onChange={(e) => setNewStream({ ...newStream, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Level (e.g. Form 1)"
            className="flex-1 p-3 border rounded-lg"
            value={newStream.level}
            onChange={(e) => setNewStream({ ...newStream, level: e.target.value })}
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg">Create Stream</button>
        </form>
      </div>

      {/* List */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">All Class Streams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {streams.map((stream) => (
            <div key={stream.id} className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold">{stream.name}</h3>
              <p className="text-gray-600">Level: {stream.level}</p>
              <p className="text-gray-600">Capacity: {stream.capacity}</p>
              <p className="text-sm text-gray-500 mt-2">Students: {stream.students?.length || 0}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassStreams;
