import API from "./axios";

export const getFoods = () => API.get("/foods");

export const addFood = (data) => API.post("/foods", data);

export const updateFood = (id, data) =>
  API.put(`/foods/${id}`, data);

export const deleteFood = (id) =>
  API.delete(`/foods/${id}`);