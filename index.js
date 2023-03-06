import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { connection } from "./db.js";
import carRoutes from "./api/car.route.js";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

connection();
app.use("/api/car", carRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
