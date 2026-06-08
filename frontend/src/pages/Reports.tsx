import { useEffect, useState } from "react";
import classStreamService from "../services/classStreamService";
import reportService from "../services/reportService";

export default function Reports() {
  const [streams, setStreams] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [report, setReport] = useState<any[]>([]);

  useEffect(() => {
    classStreamService.getAll().then(setStreams);
  }, []);

  useEffect(() => {
    if (!selected) return;

    reportService.getClassReport(selected).then(setReport);
  }, [selected]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Class Ranking Report</h1>

      <select
        onChange={(e) => setSelected(Number(e.target.value))}
        className="border p-2"
      >
        <option value="">Select Class Stream</option>
        {streams.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th>Rank</th>
            <th>Student</th>
            <th>Total</th>
            <th>Average</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {report.map((r: any, i: number) => (
            <tr key={i} className="border-t">
              <td>{r.position}</td>
              <td>{r.name}</td>
              <td>{r.total}</td>
              <td>{r.average}</td>
              <td>{r.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
