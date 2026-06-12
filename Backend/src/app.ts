import express from 'express';
import cors from 'cors';
import { login } from './controllers/authController';
import { protect } from './middleware/auth';

const app = express();

app.use(cors());
app.use(express.json());

// Auth Route
app.post('/auth/login', login);

// Example Protected Route
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'You have access to this protected data.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
