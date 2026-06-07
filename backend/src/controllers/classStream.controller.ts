import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getClassStreams = async (req: Request, res: Response) => {
  try {
    const streams = await prisma.classStream.findMany({
      include: {
        students: true,
        subjects: true
      }
    });
    res.json(streams);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch class streams" });
  }
};

export const createClassStream = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const stream = await prisma.classStream.create({
      data: { name }
    });
    res.status(201).json(stream);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getClassStreamById = async (req: Request, res: Response) => {
  try {
    const stream = await prisma.classStream.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { students: true, subjects: true }
    });
    if (!stream) return res.status(404).json({ error: "Class stream not found" });
    res.json(stream);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch class stream" });
  }
};
