import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';
import classStreamRoutes from './routes/classStream.routes';
import subjectRoutes from './routes/subject.routes';
import scoreRoutes from './routes/score.routes';

const app = express();
const PORT = process.env.PORT || 8000;

// CORS
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

app.get('/', (req: Request, res: Response) => {
  res.json({ message: "Ikonex Academy API is running" });
});

// ==================== DEFAULT ADMIN CREATOR ====================
app.get('/create-admin', async (req: Request, res: Response) => {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const bcrypt = await import('bcryptjs');
    const prisma = new PrismaClient();

    const email = 'admin@ikonex.com';
    const plainPassword = 'admin123';

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = await prisma.user.upsert({
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
      message: 'Admin ready!', 
      email: admin.email,
      password: plainPassword 
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== DEBUG ADMIN ====================
app.get('/debug-admin', async (req: Request, res: Response) => {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const admin = await prisma.user.findUnique({ where: { email: 'admin@ikonex.com' } });
    
    res.json({
      found: !!admin,
      email: admin?.email,
      hasPassword: !!admin?.password,
      passwordLength: admin?.password?.length || 0,
      role: admin?.role
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});
// =====================================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
