import { Express, Request, Response } from "express";
import { addUser, getUsers } from "./controllers/userController";

const installUserRoutes = (app: Express) => {
  app.post("/addUser", async (req: Request, res: Response) => {
    const params = req.body;

    const { newUserId } = await addUser(params);
    if (!newUserId) {
      res.status(400).end();
      return;
    }

    res.json({ newUserId });
  });

  app.get("/users", async (_, res: Response) => {
    const { users } = await getUsers();
    res.json({ users });
  });
};

export default installUserRoutes;
