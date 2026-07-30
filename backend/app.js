import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import FoodRoutes from "./routes/FoodRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173", // React/Vite frontend
        credentials: true,
    })
);
app.use("/api/foods", FoodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running 🚀",
  });
});

export default app;