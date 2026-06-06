import api from "./api";

const subjectService = {
  getAll: async () => {
    const response = await api.get("/subjects");
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post("/subjects", data);
    return response.data;
  }
};

export default subjectService;
