import api from "./api";

const subjectService = {
  getAll: async () => {
    const res = await api.get("/subjects");
    return res.data;
  },

  create: async (data: any) => {
    const res = await api.post("/subjects", data);
    return res.data;
  },

  assignToStream: async (classStreamId: string, subjectId: string) => {
    const res = await api.post("/subjects/assign", { classStreamId, subjectId });
    return res.data;
  }
};

export default subjectService;
