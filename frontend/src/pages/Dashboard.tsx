import { useEffect, useState } from "react";
import studentService from "../services/studentService";
import scoreService from "../services/scoreService";
import classStreamService from "../services/classStreamService";

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    streams: 0,
    scores: 0,
    average: 0,
  });

  useEffect(() => {
    const load = async () => {
      const students = await studentService.getAll();
      const streams = await classStreamService.getAll();
      const scores = await scoreService.getAll();

      const avg =
        scores.length > 0
          ? scores.reduce((a: number, b: any) => a + b.marks, 0) /
            scores.length
          : 0;

      setStats({
        students: students.length,
        streams: streams.length,
        scores: scores.length,
        average: Number(avg.toFixed(2)),
      });
    };

    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <Card title="Students" value={stats.students} />
        <Card title="Class Streams" value={stats.streams} />
        <Card title="Scores" value={stats.scores} />
        <Card title="Average Score" value={stats.average} />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="p-4 border rounded shadow bg-white">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
