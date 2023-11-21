import { Express, Request, Response } from "express";
import { getGarden } from "./controllers/gardenController";

const installGardenRoutes = (app: Express) => {
  app.get("/garden", async (req: Request, res: Response) => {
    const params = req.query;
    console.debug(params);
    const { garden } = await getGarden(params);
    console.log(garden);
    res.json({ garden });
  });
};

export default installGardenRoutes;
