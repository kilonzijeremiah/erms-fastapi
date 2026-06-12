import express from 'express';
import cors from 'cors';
import { login } from './controllers/authController';
import { protect } from './middleware/auth';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/auth/login', login);

// Protected Route Example
app.get('/students', protect, async (req, res) => {
  // Logic to fetch students
  res.json({ data: [] });
});

export default app;
