import { Router } from "express";
import { generateReportCard } from "../services/pdf.service";

const router = Router();

router.get("/student/:id", (req, res) => {
  const file = generateReportCard(
    { id: req.params.id, name: "Student" },
    [{ subject: "Math", marks: 80 }]
  );

  res.download(file);
});

export default router;