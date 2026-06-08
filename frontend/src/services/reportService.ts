import api from "./api";

const reportService = {
  getStudentReport: (studentId: number) =>
    api.get(`/reports/student/${studentId}`).then(res => res.data),

  getClassReport: (classId: number) =>
    api.get(`/reports/class/${classId}`).then(res => res.data),
};

export default reportService;
