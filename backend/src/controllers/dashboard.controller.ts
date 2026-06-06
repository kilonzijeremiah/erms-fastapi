import { Request, Response } from "express";

export const getDashboardStats = (req: Request, res: Response) => {
  res.json({
    students: 120,
    teachers: 10,
    subjects: 8,
    streams: 6
  });
};