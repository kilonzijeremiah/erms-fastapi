import axios from "axios";

const API = "http://localhost:8000/api/students";

/* Shared JWT header */
const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

/* GET ALL */
export const getStudents = async () => {
  const res = await axios.get(API, authHeaders());
  return res.data;
};

/* CREATE */
export const createStudent = async (data: any) => {
  const res = await axios.post(API, data, authHeaders());
  return res.data;
};

/* UPDATE */
export const updateStudent = async (id: number, data: any) => {
  const res = await axios.put(
    `http://localhost:8000/api/students/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return res.data;
};

/* DELETE */
export const deleteStudent = async (id: number) => {
  const res = await axios.delete(
    `${API}/${id}`,
    authHeaders()
  );
  return res.data;
};
