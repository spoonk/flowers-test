import express, { Express, Request, Response } from "express";
const app = express();
const port = 8080;

app.get("/", (req: Request, res: Response) => {
  console.log("/ called");
  res.send("Hello, cruel world");
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
