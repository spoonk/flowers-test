import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { exit } from "process";
dotenv.config();

const { PORT, SERVER_BASE_URL, MONGO_URL } = process.env;
if (!MONGO_URL) exit();

const app = express();
app.use(express.json());
app.use(express.urlencoded());

// connect to mongodb
mongoose.connect(MONGO_URL);

app.get("/", (req: Request, res: Response) => {
  console.log("/ called");
  res.send("Hello, cruel world");
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
