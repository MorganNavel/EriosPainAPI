import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { initDb } from "./sequelize";
import { loadRoutes } from "./helper";
import morgan from "morgan";
dotenv.config();

const port = process.env.API_PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
initDb();


app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
loadRoutes(app);
export default app;
