import API from "./axios";

export const getOrders = () => API.get("/orders");

export const createOrder = (data) =>
    API.post("/orders", data);

export const completeOrder = (id) =>
    API.put(`/orders/${id}/complete`);