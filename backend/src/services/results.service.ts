export const calculateResults = (students: any[], scores: any[]) => {
  const resultMap: any = {};

  students.forEach((s) => {
    resultMap[s.id] = {
      student: s,
      total: 0,
      count: 0,
      average: 0,
      grade: ""
    };
  });

  scores.forEach((sc) => {
    if (resultMap[sc.student_id]) {
      resultMap[sc.student_id].total += sc.marks;
      resultMap[sc.student_id].count += 1;
    }
  });

  Object.values(resultMap).forEach((r: any) => {
    r.average = r.total / (r.count || 1);

    if (r.average >= 80) r.grade = "A";
    else if (r.average >= 70) r.grade = "B";
    else if (r.average >= 60) r.grade = "C";
    else if (r.average >= 50) r.grade = "D";
    else r.grade = "E";
  });

  return Object.values(resultMap)
    .sort((a: any, b: any) => b.total - a.total)
    .map((r: any, index: number) => ({
      ...r,
      position: index + 1
    }));
};