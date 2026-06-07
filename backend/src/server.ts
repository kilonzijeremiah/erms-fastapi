import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';
import classStreamRoutes from './routes/classStream.routes';
import subjectRoutes from './routes/subject.routes';
import scoreRoutes from './routes/score.routes';

const app = express();
const PORT = process.env.PORT || 8000;

// CORS Configuration
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
  res.json({ message: "Ikonex Academy Student Management System API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
