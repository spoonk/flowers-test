import { Express, Request, Response } from "express";

const installGardenRoutes = (app: Express) => {
  app.get("/garden", async (req: Request, res: Response) => {
    res.json({ hi: "123" });
  });
};

export default installGardenRoutes;
