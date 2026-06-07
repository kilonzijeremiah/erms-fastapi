import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, admissionNumber, classStreamId } = req.body;
    
    if (!name || !admissionNumber || !classStreamId) {
      return res.status(400).json({ error: "Name, Admission Number and Class Stream are required" });
    }

    const student = await prisma.student.create({
      data: {
        name,
        admissionNumber,
        classStreamId: parseInt(classStreamId)
      },
      include: { classStream: true }
    });

    res.status(201).json(student);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message || "Failed to create student" });
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  const students = await prisma.student.findMany({
    include: { classStream: true }
  });
  res.json(students);
};

export const getStudentById = async (req: Request, res: Response) => {
  const student = await prisma.student.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { classStream: true, scores: { include: { subject: true } } }
  });
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
};

export const getStudentsByClassStream = async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany({
      where: { classStreamId: parseInt(req.params.classStreamId) },
      include: { classStream: true }
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students by class stream" });
  }
};
