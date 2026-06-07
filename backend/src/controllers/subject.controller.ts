import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await prisma.subject.findMany({
      include: { classStream: true, teachers: { include: { teacher: { include: { user: true } } } } }
    });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
};

export const createSubject = async (req: Request, res: Response) => {
  try {
    const { name, classStreamId } = req.body;
    const subject = await prisma.subject.create({
      data: { name, classStreamId: parseInt(classStreamId) },
      include: { classStream: true }
    });
    res.status(201).json(subject);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getSubjectById = async (req: Request, res: Response) => {
  try {
    const subject = await prisma.subject.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { classStream: true }
    });
    if (!subject) return res.status(404).json({ error: "Subject not found" });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subject" });
  }
};
