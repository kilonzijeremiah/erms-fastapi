import api from "./api";

export interface ClassStream {
  id: number;
  name: string;
}

const classStreamService = {
  getAll: async (): Promise<ClassStream[]> => {
    const res = await api.get("/class-streams");
    return res.data;
  },
};

export default classStreamService;
