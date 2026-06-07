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
    'http://localhost:3000',
    'http://localhost:8000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
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

// ==================== TEMPORARY ADMIN RESET ====================
app.get('/create-admin', async (req: Request, res: Response) => {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const bcrypt = await import('bcryptjs');
    const prisma = new PrismaClient();

    const email = 'admin@ikonex.com';
    const plainPassword = 'admin123';

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await prisma.user.upsert({
      where: { email },
      update: { password: hashedPassword },
      create: {
        email,
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN',
      },
    });

    res.json({ 
      success: true, 
      message: 'Admin password reset successfully!', 
      email, 
      password: plainPassword 
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
// ============================================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
