import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { connection } from "./db.js";
import carRoutes from "./api/car.route.js";
import cors from "cors";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { join } from "path";

dotenv.config();

const app = express();

// Obtener la ruta del archivo HTML
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

app.use(bodyParser.json());
app.use(cors());

connection();
app.use("/api/car", carRoutes);

// Ruta para enviar el archivo HTML
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
