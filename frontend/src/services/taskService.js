
import axios from "axios";

const API = axios.create({
  baseURL: "/api"
});

export const getTasks = async () => {
  const response = await API.get("/tasks");
  return response.data.data;
};

export const createTask = async (task) => {
  const response = await API.post("/tasks", task);
  return response.data.data;
};

export const updateTask = async (id, task) => {
  const response = await API.put(`/tasks/${id}`, task);
  return response.data.data;
};

export const deleteTask = async (id) => {
  const response = await API.delete(`/tasks/${id}`);
  return response.data;
};
