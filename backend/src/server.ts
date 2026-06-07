import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';
import classStreamRoutes from './routes/classStream.routes';
import subjectRoutes from './routes/subject.routes';
import scoreRoutes from './routes/score.routes';
// import reportRoutes from './routes/report.routes'; // ← Comment this line

const app = express();
const PORT = process.env.PORT || 8000;

// Fixed CORS Configuration
app.use(cors({
  origin: [
    'https://ikonex-frontend-ecru.vercel.app', // Production frontend
    'http://localhost:5173',                   // Vite local dev
    'http://localhost:3000',                   // Alternative local
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
// app.use('/reports', reportRoutes); // ← Comment this line too

app.get('/', (req, res) => {
  res.json({ message: "Ikonex Academy API is running" });
});

// ===================== TEMPORARY ADMIN CREATOR =====================
app.get('/create-admin', async (req, res) => {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const bcrypt = await import('bcryptjs');
    
    const prisma = new PrismaClient();

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.upsert({
      where: { email: 'admin@ikonex.com' },
      update: {},
      create: {
        email: 'admin@ikonex.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN',
      },
    });

    res.json({ 
      success: true, 
      message: 'Default admin created successfully', 
      email: admin.email,
      password: 'admin123 (use this to login)'
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
// ==================================================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
