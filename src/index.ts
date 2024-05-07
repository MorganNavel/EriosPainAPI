import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { initDb } from "./sequelize";
import { loadRoutes } from "./helper";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

const port = process.env.API_PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
initDb();

app.listen(port, () => {
  console.log(`Server is running`);
});
loadRoutes(app);
export default app;
