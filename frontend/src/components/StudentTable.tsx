import studentService, { Student } from "../services/studentService";

export default function StudentTable({
  students,
  onRefresh
}: {
  students: Student[];
  onRefresh: () => void;
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
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {students.map((s) => (
          <tr key={s.id} className="border-t">
            <td className="p-2">{s.name}</td>
            <td>{s.admissionNumber}</td>
            <td>{s.classStreamId}</td>
            <td>
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
