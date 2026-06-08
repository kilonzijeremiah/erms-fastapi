import studentService, { Student } from "../services/studentService";

export default function StudentTable({
  students,
  onRefresh,
  onEdit
}: {
  students: Student[];
  onRefresh: () => void;
  onEdit: (student: Student) => void;
}) {
  const handleDelete = async (id?: number) => {
    if (!id) return;
    await studentService.remove(id);
    onRefresh();
  };

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Name</th>
          <th>Admission No</th>
          <th>Class</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((s) => (
          <tr key={s.id} className="border-t">
            <td className="p-2">{s.name}</td>
            <td>{s.admissionNumber}</td>
            <td>{s.classStreamId}</td>

            <td className="space-x-2">
              <button
                onClick={() => onEdit(s)}
                className="bg-blue-500 text-white px-2 py-1"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(s.id)}
                className="bg-red-500 text-white px-2 py-1"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
