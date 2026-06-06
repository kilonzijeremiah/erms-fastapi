import studentRoutes from "./routes/student.routes";
import { authMiddleware } from "./middleware/auth.middleware";

app.use("/api/students", authMiddleware, studentRoutes);
