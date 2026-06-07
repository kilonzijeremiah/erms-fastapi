import express, { Request, Response } from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';
import classStreamRoutes from './routes/classStream.routes';
import subjectRoutes from './routes/subject.routes';
import scoreRoutes from './routes/score.routes';
import teacherRoutes from './routes/teacher.routes';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: [
    'https://ikonex-frontend-ecru.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/class-streams', classStreamRoutes);
app.use('/subjects', subjectRoutes);
app.use('/scores', scoreRoutes);
app.use('/teachers', teacherRoutes);

/* HEALTH CHECK */
app.get('/', (req: Request, res: Response) => {
  res.json({ message: "Ikonex API is running" });
});

/* CREATE ADMIN (FIXED) */
app.get('/create-admin', async (req: Request, res: Response) => {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const bcrypt = await import('bcryptjs');

    const prisma = new PrismaClient();

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const user = await prisma.user.upsert({
      where: {
        email: 'admin@ikonex.com'
      },
      update: {
        password: hashedPassword
      },
      create: {
        email: 'admin@ikonex.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN'
      }
    });

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      error: error.message
    });
  }
});

/* DEBUG USERS */
app.get('/debug-users', async (req: Request, res: Response) => {
  try {
    const { PrismaClient } = await import('@prisma/client');

    const prisma = new PrismaClient();

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });

    return res.json(users);

  } catch (error: any) {
    return res.status(500).json({
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
