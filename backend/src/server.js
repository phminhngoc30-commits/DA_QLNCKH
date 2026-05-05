import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import favouriteRoutes from "./routes/favouriteRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import cookieParser from "cookie-parser";
import { protectedRoute } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

//public routes
app.use("/api/auth", authRoutes);

//private/public mixed routes
app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/favourite", favouriteRoutes);
app.use("/api/submission", submissionRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server bắt đầu trên cổng 5001");
  });
});
