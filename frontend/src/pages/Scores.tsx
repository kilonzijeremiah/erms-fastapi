import { useState, useEffect } from "react";
import scoreService from "../services/scoreService";
import studentService from "../services/studentService";
import subjectService from "../services/subjectService";
import jsPDF from "jspdf";

const Scores = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [scores, setScores] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    studentId: "",
    subjectId: "",
    examType: "CAT1",
    marks: ""
  });

  const fetchData = async () => {
    try {
      const [stData, subData] = await Promise.all([
        studentService.getAllStudents(),
        subjectService.getAll()
      ]);
      setStudents(stData);
      setSubjects(subData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await scoreService.recordScore(formData);
      alert("Score recorded successfully");
      setFormData({ studentId: "", subjectId: "", examType: "CAT1", marks: "" });
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to record score");
    }
  };

  const getGrade = (marks: number) => {
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "E";
  };

  const generateReportCard = (student: any) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("IKONEX ACADEMY REPORT CARD", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Name: ${student.name}`, 20, 40);
    doc.text(`Student ID: ${student.studentId}`, 20, 50);
    doc.text(`Class: ${student.classStream?.name || "N/A"}`, 20, 60);

    // Add scores (you can expand this with real scores)
    doc.text("Subject          Marks    Grade", 20, 80);
    doc.save(`${student.name.replace(" ", "_")}_Report_Card.pdf`);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Assessment & Results</h1>

      {/* Record Score */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6">Record Student Score</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select value={formData.studentId} onChange={(e) => setFormData({...formData, studentId: e.target.value})} required className="p-3 border rounded-lg">
            <option value="">Select Student</option>
            {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          <select value={formData.subjectId} onChange={(e) => setFormData({...formData, subjectId: e.target.value})} required className="p-3 border rounded-lg">
            <option value="">Select Subject</option>
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          <select value={formData.examType} onChange={(e) => setFormData({...formData, examType: e.target.value})} className="p-3 border rounded-lg">
            <option value="CAT1">CAT 1</option>
            <option value="CAT2">CAT 2</option>
            <option value="Midterm">Midterm</option>
            <option value="Final">Final Exam</option>
          </select>

          <input 
            type="number" 
            placeholder="Marks (0-100)" 
            value={formData.marks} 
            onChange={(e) => setFormData({...formData, marks: e.target.value})} 
            min="0" 
            max="100" 
            required 
            className="p-3 border rounded-lg"
          />

          <button type="submit" className="md:col-span-4 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
            Record Score
          </button>
        </form>
      </div>

      {/* Report Cards */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6">Generate Report Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div key={student.id} className="border p-6 rounded-xl">
              <p className="font-medium">{student.name}</p>
              <p className="text-sm text-gray-500">{student.studentId}</p>
              <button 
                onClick={() => generateReportCard(student)}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Download Report Card
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scores;
