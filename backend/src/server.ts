import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/auth.routes";

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    "https://ikonex-frontend-ecru.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Ikonex Backend Running" });
});

// Routes
app.use("/auth", authRoutes);

// Create Admin (UTILITY ROUTE)
app.get("/create-admin", async (req, res) => {
  try {
    const bcrypt = await import("bcryptjs");

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const user = await prisma.user.upsert({
      where: { email: "admin@ikonex.com" },
      update: {},
      create: {
        email: "admin@ikonex.com",
        password: hashedPassword,
        name: "Admin",
        role: "ADMIN"
      }
    });

    res.json({ success: true, user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
