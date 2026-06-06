import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const recordScore = async (req: Request, res: Response) => {
  try {
    const { studentId, subjectId, examType, marks } = req.body;
    const score = await prisma.score.create({
      data: { studentId, subjectId, examType, marks }
    });
    res.status(201).json(score);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getStudentScores = async (req: Request, res: Response) => {
  const scores = await prisma.score.findMany({
    where: { studentId: req.params.studentId },
    include: { subject: true }
  });
  res.json(scores);
};

export const getClassPerformance = async (req: Request, res: Response) => {
  const { classStreamId, subjectId } = req.params;
  const scores = await prisma.score.findMany({
    where: { 
      student: { classStreamId },
      subjectId 
    },
    include: { student: true }
  });
  res.json(scores);
};
