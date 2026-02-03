// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoute);       // /api/users
app.use("/api/products", productRoute); // /api/products

// Start server
const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected Successfully.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
