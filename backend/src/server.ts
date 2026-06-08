import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Middleware
app.use(cors({
  origin: ['https://ikonex-frontend-ecru.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// ==================== AUTH ROUTES ====================
app.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ==================== ADMIN RESET ====================
app.get('/create-admin', async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const user = await prisma.user.upsert({
      where: { email: 'admin@ikonex.com' },
      update: { password: hashedPassword },
      create: {
        email: 'admin@ikonex.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN'
      }
    });

    res.json({ success: true, user });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// DEBUG
app.get('/debug-users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Ikonex Backend Running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
