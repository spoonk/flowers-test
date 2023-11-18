import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { exit } from "process";
import installUserRoutes from "./services/users/routes";
import installHabitRoutes from "./services/habits/routes";
const cors = require("cors");

dotenv.config();

const { SERVER_PORT, SERVER_BASE_URL, MONGO_URL, COLLECTION } = process.env;
if (!MONGO_URL) exit();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

installUserRoutes(app);
installHabitRoutes(app);

// connect to mongodb
mongoose.connect(`${MONGO_URL}${COLLECTION}`);

app.get("/", (req: Request, res: Response) => {
  console.log("/ called");
  res.send("Hello, cruel world");
});

app.listen(SERVER_PORT, () => {
  console.log(`server started on port ${SERVER_PORT}`);
});
