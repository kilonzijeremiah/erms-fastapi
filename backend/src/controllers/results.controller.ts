import { Request, Response } from "express";
import { calculateResults } from "../services/results.service";

export const getClassResults = (req: Request, res: Response) => {
  const students = [
    { id: 1, name: "John" },
    { id: 2, name: "Mary" }
  ];

  const scores = [
    { student_id: 1, marks: 80 },
    { student_id: 1, marks: 70 },
    { student_id: 2, marks: 90 }
  ];

  const results = calculateResults(students, scores);

  res.json(results);
};