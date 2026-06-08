import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import reportService from "../services/reportService";

export default function StudentDetails() {
  const { id } = useParams();
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    reportService.getStudentReport(Number(id)).then(setReport);
  }, [id]);

  if (!report) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Student Performance</h1>

      <div className="bg-white p-4 border rounded">
        <p><b>Name:</b> {report.student.name}</p>
        <p><b>Class:</b> {report.student.classStream}</p>
        <p><b>Total Marks:</b> {report.total}</p>
        <p><b>Average:</b> {report.average}</p>
        <p><b>Grade:</b> {report.grade}</p>
        <p><b>Position:</b> {report.position}</p>
      </div>

      <h2 className="text-lg font-semibold mt-4">Subject Breakdown</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Subject</th>
            <th>Marks</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {report.subjects.map((s: any, i: number) => (
            <tr key={i} className="border-t">
              <td>{s.name}</td>
              <td>{s.marks}</td>
              <td>{s.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
