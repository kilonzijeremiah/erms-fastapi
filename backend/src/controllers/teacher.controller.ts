import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

export const getTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        user: true,
        subjects: { include: { subject: true } }
      }
    });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
};

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const { email, password, name, subjects = [] } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'TEACHER'
      }
    });

    const teacher = await prisma.teacher.create({
      data: {
        userId: user.id,
        subjects: {
          create: subjects.map((subjectId: number) => ({ subjectId }))
        }
      },
      include: { user: true, subjects: { include: { subject: true } } }
    });

    res.status(201).json(teacher);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTeacher = async (req: Request, res: Response) => {
  // Implement as needed
  res.status(501).json({ message: "Update teacher - to be implemented" });
};

export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    await prisma.teacher.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Teacher deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete teacher" });
  }
};

export const assignSubjectToTeacher = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params;
    const { subjectId } = req.body;

    const assignment = await prisma.subjectTeacher.create({
      data: { teacherId: parseInt(teacherId), subjectId: parseInt(subjectId) }
    });

    res.json(assignment);
  } catch (error) {
    res.status(400).json({ error: "Failed to assign subject" });
  }
};
