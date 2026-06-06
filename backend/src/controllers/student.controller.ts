// backend/src/controllers/student.controller.ts
import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, studentId, gender, dateOfBirth, classStreamId } = req.body;

    if (!name || !studentId || !classStreamId) {
      return res.status(400).json({ error: "Name, Student ID and Class Stream are required" });
    }

    const classStream = await prisma.classStream.findUnique({
      where: { id: classStreamId }
    });

    if (!classStream) {
      return res.status(400).json({ error: "Class Stream not found. Please select a valid class." });
    }

    const student = await prisma.student.create({
      data: {
        name,
        email,
        studentId,
        gender,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        classStreamId
      },
      include: { classStream: true }
    });

    res.status(201).json(student);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ 
      error: error.message || "Failed to create student" 
    });
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
    where: { id: req.params.id },
    include: { classStream: true, scores: { include: { subject: true } } }
  });
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await prisma.student.update({
      where: { id: req.params.id },
      data: req.body,
      include: { classStream: true }
    });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: "Failed to update student" });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    await prisma.student.delete({ where: { id: req.params.id } });
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete student" });
  }
};

// This was missing - important for class stream filtering
export const getStudentsByClassStream = async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany({
      where: { classStreamId: req.params.classStreamId },
      include: { classStream: true }
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students by class stream" });
  }
};
