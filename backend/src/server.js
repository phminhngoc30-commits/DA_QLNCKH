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
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middlewares

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: ["http://localhost:5173"] }));
}
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..frontend/dist", "index.html"));
  });
}

// Database connection wrapper for serverless
const startServer = async () => {
  try {
    await connectDB();
    if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  } catch (err) {
    console.error("Database connection failed", err);
  }
};

startServer();

export default app;
