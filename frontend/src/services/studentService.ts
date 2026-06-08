import api from "./api";

export interface Student {
  id?: number;
  name: string;
  admissionNumber: string;
  classStreamId: number;
  gender?: string;
  age?: number;
}

const studentService = {
  getAll: async () => {
    const res = await api.get("/students");
    return res.data;
  },

  getOne: async (id: number) => {
    const res = await api.get(`/students/${id}`);
    return res.data;
  },

  create: async (data: Student) => {
    const res = await api.post("/students", data);
    return res.data;
  },

  update: async (id: number, data: Student) => {
    const res = await api.put(`/students/${id}`, data);
    return res.data;
  },

  remove: async (id: number) => {
    const res = await api.delete(`/students/${id}`);
    return res.data;
  }
};

export default studentService;
