import { Express, Request, Response } from "express";
import {
  addHabit,
  completeHabit,
  getHabits,
} from "./controllers/habitController";

const installHabitRoutes = (app: Express) => {
  app.post("/addhabit", async (req: Request, res: Response) => {
    console.log("/addHabit");
    const params = req.body;
    const { newHabit } = await addHabit(params);
    res.json({ newHabit });
  });

  app.get("/habits", async (req: Request, res: Response) => {
    const { userId } = req.query;
    const habits = await getHabits(userId);
    res.json({ habits });
  });

  app.post("/completeHabit", async (req: Request, res: Response) => {
    console.log("/completeHabit");
    const params = req.body;
    const gardenId = await completeHabit(params);
    res.json({ gardenId });
  });
};

export default installHabitRoutes;
