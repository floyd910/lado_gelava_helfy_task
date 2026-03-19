import axios from "axios";

const API_URL = "http://localhost:4000";

export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/api/tasks`);
  return response.data;
};

export const createTask = async (title, description, priority) => {
  const response = await axios.post(`${API_URL}/api/tasks`, {
    title,
    description,
    priority,
  });
  return response.data;
};

export const updateTask = async (id, title, description, priority) => {
  const response = await axios.put(`${API_URL}/api/tasks/${id}`, {
    title,
    description,
    priority,
  });
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/api/tasks/${id}`);
  return response.data;
};

export const toggleTaskCompletion = async (id) => {
  const response = await axios.patch(`${API_URL}/api/tasks/${id}/toggle`, {});
  return response.data;
};
