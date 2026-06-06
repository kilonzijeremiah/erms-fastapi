import api from "./api";

const classStreamService = {
  getAll: async () => {
    const response = await api.get("/class-streams");
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post("/class-streams", data);
    return response.data;
  }
};

export default classStreamService;
