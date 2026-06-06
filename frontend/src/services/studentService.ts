import api from "./api";

const studentService = {
  getAllStudents: async () => {
    const response = await api.get("/students");
    return response.data;
  },

  createStudent: async (data: any) => {
    const response = await api.post("/students", data);
    return response.data;
  },

  updateStudent: async (id: string, data: any) => {
    const response = await api.put(`/students/${id}`, data);
    return response.data;
  },

  deleteStudent: async (id: string) => {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  }
};

export default studentService;
