import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const recordScore = async (req: Request, res: Response) => {
  try {
    const { studentId, subjectId, ca1, ca2, exam } = req.body;

    const total = (ca1 || 0) + (ca2 || 0) + (exam || 0);

    const score = await prisma.score.upsert({
      where: { 
        studentId_subjectId: { 
          studentId: parseInt(studentId), 
          subjectId: parseInt(subjectId) 
        } 
      },
      update: { ca1, ca2, exam, total },
      create: { 
        studentId: parseInt(studentId), 
        subjectId: parseInt(subjectId), 
        ca1, 
        ca2, 
        exam, 
        total 
      }
    });

    res.status(201).json(score);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getStudentScores = async (req: Request, res: Response) => {
  const scores = await prisma.score.findMany({
    where: { studentId: parseInt(req.params.studentId) },
    include: { subject: true }
  });
  res.json(scores);
};

export const getClassPerformance = async (req: Request, res: Response) => {
  const { classStreamId, subjectId } = req.params;
  const scores = await prisma.score.findMany({
    where: {
      student: { classStreamId: parseInt(classStreamId) },
      subjectId: subjectId ? parseInt(subjectId) : undefined
    },
    include: { student: true, subject: true }
  });
  res.json(scores);
};
