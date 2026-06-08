import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// ==================== MIDDLEWARE ====================
app.use(
  cors({
    origin: ["https://ikonex-frontend-ecru.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

// ==================== HEALTH CHECK ====================
app.get("/", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "Ikonex Backend Running" });
});

// =====================================================
// ==================== AUTH ROUTES ====================
// =====================================================

app.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// =====================================================
// ================= STUDENT ROUTES ====================
// =====================================================

app.get("/students", async (req, res) => {
  const students = await prisma.student.findMany();
  res.json(students);
});

// =====================================================
// ============== SCORE ROUTES (BASIC) =================
// =====================================================

app.get("/scores", async (req, res) => {
  const scores = await prisma.score.findMany();
  res.json(scores);
});

// =====================================================
// ============== 📊 REPORTING SECTION ==================
// =====================================================
// 🔥 THIS IS THE EXACT LOCATION YOU ASKED FOR

// ==================== STUDENT REPORT CARD ====================
app.get("/reports/student/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        classStream: true,
        scores: {
          include: {
            subject: true,
          },
        },
      },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const total = student.scores.reduce((a, b) => a + b.marks, 0);
    const average = student.scores.length
      ? total / student.scores.length
      : 0;

    const grade =
      average >= 80
        ? "A"
        : average >= 70
        ? "B"
        : average >= 60
        ? "C"
        : average >= 50
        ? "D"
        : "E";

    res.json({
      student: {
        id: student.id,
        name: student.name,
        classStream: student.classStream?.name,
      },
      total,
      average: Number(average.toFixed(2)),
      grade,
      subjects: student.scores.map((s) => ({
        name: s.subject?.name,
        marks: s.marks,
        grade:
          s.marks >= 80
            ? "A"
            : s.marks >= 70
            ? "B"
            : s.marks >= 60
            ? "C"
            : s.marks >= 50
            ? "D"
            : "E",
      })),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate report" });
  }
});

// ==================== CLASS RANKING ====================
app.get("/reports/class/:id", async (req: Request, res: Response) => {
  try {
    const classId = Number(req.params.id);

    const students = await prisma.student.findMany({
      where: { classStreamId: classId },
      include: {
        scores: true,
      },
    });

    const ranked = students
      .map((s) => {
        const total = s.scores.reduce((a, b) => a + b.marks, 0);
        const average = s.scores.length ? total / s.scores.length : 0;

        return {
          id: s.id,
          name: s.name,
          total,
          average: Number(average.toFixed(2)),
        };
      })
      .sort((a, b) => b.total - a.total)
      .map((s, index) => ({
        ...s,
        position: index + 1,
        grade:
          s.average >= 80
            ? "A"
            : s.average >= 70
            ? "B"
            : s.average >= 60
            ? "C"
            : s.average >= 50
            ? "D"
            : "E",
      }));

    res.json(ranked);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate class ranking" });
  }
});

// =====================================================
// ================= SERVER START =======================
// =====================================================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
