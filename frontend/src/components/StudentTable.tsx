import { useState } from "react";
import studentService from "../services/studentService";

interface Props {
  students: any[];
  refresh: () => void;
}

const StudentTable = ({ students, refresh }: Props) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await studentService.deleteStudent(id);
      refresh();
    } catch (err) {
      alert("Failed to delete student");
    }
  };

  const startEdit = (student: any) => {
    setEditingId(student.id);
    setEditData(student);
  };

  const saveEdit = async () => {
    try {
      await studentService.updateStudent(editingId!, editData);
      setEditingId(null);
      refresh();
    } catch (err) {
      alert("Failed to update");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">Student ID</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Class</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">{student.studentId}</td>
              <td className="px-6 py-4 font-medium">
                {editingId === student.id ? (
                  <input value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} className="border p-1 w-full" />
                ) : student.name}
              </td>
              <td className="px-6 py-4">
                {editingId === student.id ? (
                  <input value={editData.email || ""} onChange={(e) => setEditData({...editData, email: e.target.value})} className="border p-1 w-full" />
                ) : (student.email || "-")}
              </td>
              <td className="px-6 py-4">{student.classStream?.name}</td>
              <td className="px-6 py-4">
                {editingId === student.id ? (
                  <>
                    <button onClick={saveEdit} className="text-green-600 mr-3">Save</button>
                    <button onClick={() => setEditingId(null)} className="text-gray-500">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(student)} className="text-blue-600 mr-3">Edit</button>
                    <button onClick={() => handleDelete(student.id)} className="text-red-600">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
