import { useEffect, useState } from "react";
import studentService from "../services/studentService";

const Results = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const calculateAverage = (student: any) => {
    if (!student.scores || student.scores.length === 0) return 0;
    const total = student.scores.reduce((sum: number, s: any) => sum + Number(s.marks), 0);
    return (total / student.scores.length).toFixed(1);
  };

  const getGrade = (avg: number) => {
    if (avg >= 80) return "A";
    if (avg >= 70) return "B";
    if (avg >= 60) return "C";
    if (avg >= 50) return "D";
    return "E";
  };

  const rankedStudents = [...students].sort((a, b) => {
    const avgA = parseFloat(calculateAverage(a));
    const avgB = parseFloat(calculateAverage(b));
    return avgB - avgA;
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Results Processing</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold">Class Ranking</h2>
        </div>

        {loading ? (
          <p className="text-center py-12">Loading results...</p>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">Rank</th>
                <th className="px-6 py-4 text-left">Student Name</th>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Average Score</th>
                <th className="px-6 py-4 text-left">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rankedStudents.map((student, index) => {
                const avg = parseFloat(calculateAverage(student));
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-lg">{index + 1}</td>
                    <td className="px-6 py-4 font-medium">{student.name}</td>
                    <td className="px-6 py-4 text-gray-600">{student.studentId}</td>
                    <td className="px-6 py-4 font-semibold">{avg}</td>
                    <td className="px-6 py-4">
                      <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                        avg >= 80 ? 'bg-green-100 text-green-700' : 
                        avg >= 70 ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {getGrade(avg)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Results;
