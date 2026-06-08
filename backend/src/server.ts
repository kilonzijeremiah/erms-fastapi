app.get("/reports/class/:id", async (req, res) => {
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
        const avg = s.scores.length ? total / s.scores.length : 0;

        return {
          id: s.id,
          name: s.name,
          total,
          average: Number(avg.toFixed(2)),
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
    res.status(500).json({ error: "Ranking failed" });
  }
});
