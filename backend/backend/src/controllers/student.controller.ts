import { Request, Response } from "express";
import prisma from "../lib/prisma";

/* GET ALL STUDENTS */
export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
};

/* CREATE STUDENT */
export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, class: className } = req.body;

    const student = await prisma.student.create({
      data: {
        name,
        class: className,
      },
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error creating student" });
  }
};

/* UPDATE STUDENT */
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, class: className } = req.body;

    const updated = await prisma.student.update({
      where: { id },
      data: {
        name,
        class: className,
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating student" });
  }
};

/* DELETE STUDENT */
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.student.delete({
      where: { id },
    });

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student" });
  }
};
