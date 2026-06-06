import { useState, useEffect } from "react";
import studentService from "../services/studentService";
import classStreamService from "../services/classStreamService";

interface Props {
  onSuccess?: () => void;
}

const StudentForm = ({ onSuccess }: Props) => {
  const [streams, setStreams] = useState<any[]>([]);
  const [loadingStreams, setLoadingStreams] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    gender: "",
    dateOfBirth: "",
    classStreamId: ""
  });
  const [loading, setLoading] = useState(false);

  // Load Class Streams
  useEffect(() => {
    const loadStreams = async () => {
      try {
        const data = await classStreamService.getAll();
        setStreams(data);
      } catch (err) {
        console.error("Failed to load class streams:", err);
      } finally {
        setLoadingStreams(false);
      }
    };
    loadStreams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.classStreamId) {
      alert("Please select a Class Stream");
      return;
    }

    setLoading(true);
    try {
      await studentService.createStudent(formData);
      alert("Student added successfully!");
      setFormData({
        name: "", email: "", studentId: "", gender: "", dateOfBirth: "", classStreamId: ""
      });
      onSuccess?.();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email Address"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <input
        type="text"
        placeholder="Student ID"
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        value={formData.studentId}
        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
        />

        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <select
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        value={formData.classStreamId}
        onChange={(e) => setFormData({ ...formData, classStreamId: e.target.value })}
        required
      >
        <option value="">
          {loadingStreams ? "Loading class streams..." : "Select Class Stream"}
        </option>
        {streams.map((stream) => (
          <option key={stream.id} value={stream.id}>
            {stream.name} ({stream.level})
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Adding Student..." : "Add Student"}
      </button>
    </form>
  );
};

export default StudentForm;
