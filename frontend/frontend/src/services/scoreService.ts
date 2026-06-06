import api from "./api";

const scoreService = {
  recordScore: async (data: any) => {
    const res = await api.post("/scores", data);
    return res.data;
  },

  getStudentScores: async (studentId: string) => {
    const res = await api.get(`/scores/student/${studentId}`);
    return res.data;
  },

  getClassPerformance: async (classStreamId: string, subjectId: string) => {
    const res = await api.get(`/scores/class/${classStreamId}/subject/${subjectId}`);
    return res.data;
  }
};

export default scoreService;
