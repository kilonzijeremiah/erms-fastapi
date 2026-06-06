import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const createSubject = async (req: Request, res: Response) => {
  const { name, code } = req.body;
  const subject = await prisma.subject.create({ data: { name, code } });
  res.status(201).json(subject);
};

export const getAllSubjects = async (req: Request, res: Response) => {
  const subjects = await prisma.subject.findMany();
  res.json(subjects);
};

export const assignSubjectToStream = async (req: Request, res: Response) => {
  const { classStreamId, subjectId } = req.body;
  const assignment = await prisma.streamSubject.create({
    data: { classStreamId, subjectId }
  });
  res.status(201).json(assignment);
};
