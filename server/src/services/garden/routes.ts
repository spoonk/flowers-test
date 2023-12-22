import { Express, Request, Response } from "express";
import { getGarden } from "./controllers/gardenController";
import { logger } from "../../utils/logger";

const installGardenRoutes = (app: Express) => {
  app.get("/garden", async (req: Request, res: Response) => {
    logger.info("GET /garden");
    const params = req.query;
    const { garden } = await getGarden(params);
    res.json({ garden });
  });
};

export default installGardenRoutes;
