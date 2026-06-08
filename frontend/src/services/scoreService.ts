import api from "./api";

export interface Score {
  id?: number;
  studentId: number;
  subjectId: number;
  marks: number;
}

const scoreService = {
  create: (data: Score) => api.post("/scores", data),
  getAll: () => api.get("/scores").then(res => res.data),
  update: (id: number, data: Score) => api.put(`/scores/${id}`, data),
  remove: (id: number) => api.delete(`/scores/${id}`),
};

export default scoreService;
