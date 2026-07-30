import axios from "axios";

const API = axios.create({
    // baseURL: "http://localhost:5000/api",
    baseURL: "https://canteen-z071.onrender.com/api",
    withCredentials: true,
});

export default API;