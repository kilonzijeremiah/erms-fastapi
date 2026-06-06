// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';
import classStreamRoutes from './routes/classStream.routes';
import subjectRoutes from './routes/subject.routes';
import scoreRoutes from './routes/score.routes';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/class-streams', classStreamRoutes);
app.use('/subjects', subjectRoutes);
app.use('/scores', scoreRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: "Ikonex Academy Student Management System API",
    status: "Running on port " + PORT 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
