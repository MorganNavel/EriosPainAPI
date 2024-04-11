import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { initDb } from "./sequelize";
import { loadRoutes } from "./helper";
import { authMiddleware } from "./middleware";
dotenv.config();

const port = process.env.API_PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
initDb();


app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
loadRoutes(app);
export default app;
