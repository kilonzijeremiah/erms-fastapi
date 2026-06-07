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

app.get('/', (req: Request, res: Response) => {
  res.json({ message: "Ikonex Academy Student Management System API is running" });
});

// ==================== ADMIN RESET (Keep for now) ====================
app.get('/create-admin', async (req: Request, res: Response) => {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const bcrypt = await import('bcryptjs');
    const prisma = new PrismaClient();

    const hashed = await bcrypt.hash('admin123', 10);

    await prisma.user.upsert({
      where: { email: 'admin@ikonex.com' },
      update: { password: hashed },
      create: {
        email: 'admin@ikonex.com',
        password: hashed,
        name: 'Admin User',
        role: 'ADMIN'
      }
    });

    res.json({ success: true, message: 'Admin ready - use admin@ikonex.com / admin123' });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});
// =================================================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
