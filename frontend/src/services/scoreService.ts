import api from "./api";

const scoreService = {
  getAllScores: async () => {
    const response = await api.get("/scores");
    return response.data;
  },

  recordScore: async (data: any) => {
    const response = await api.post("/scores", data);
    return response.data;
  }
};

export default scoreService;
