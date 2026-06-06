import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const createClassStream = async (req: Request, res: Response) => {
  try {
    const { name, level, capacity = 40 } = req.body;
    const stream = await prisma.classStream.create({
      data: { name, level, capacity }
    });
    res.status(201).json(stream);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllClassStreams = async (req: Request, res: Response) => {
  const streams = await prisma.classStream.findMany({
    include: { students: true }
  });
  res.json(streams);
};

export const getClassStreamById = async (req: Request, res: Response) => {
  const stream = await prisma.classStream.findUnique({
    where: { id: req.params.id },
    include: { students: true, subjects: { include: { subject: true } } }
  });
  if (!stream) return res.status(404).json({ error: "Class stream not found" });
  res.json(stream);
};
