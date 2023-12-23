import { Express, Request, Response } from "express";
import {
  addHabit,
  completeHabit,
  getHabits,
} from "./controllers/habitController";

const installHabitRoutes = (app: Express) => {
  app.post("/addHabit", async (req: Request, res: Response) => {
    const params = req.body;
    await addHabit(params);
    res.json({ success: true });
  });

  app.get("/habits", async (req: Request, res: Response) => {
    const { userId } = req.query;
    const habits = await getHabits(userId);
    res.json({ habits });
  });

  app.post("/completeHabit", async (req: Request, res: Response) => {
    const params = req.body;
    await completeHabit(params);
    res.json({ success: true });
  });
};

export default installHabitRoutes;
