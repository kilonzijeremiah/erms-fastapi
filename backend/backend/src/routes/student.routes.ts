import { Router } from "express";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller";

const router = Router();

/* =========================
   STUDENT CRUD ROUTES
========================= */

router.get("/", getStudents);        // GET all students
router.post("/", createStudent);     // CREATE student
router.put("/:id", updateStudent);   // UPDATE student
router.delete("/:id", deleteStudent); // DELETE student

export default router;
