import { Express, Request, Response } from "express";
import { addUser, getUsers } from "./controllers/userController";

const installUserRoutes = (app: Express) => {
  app.post("/addUser", async (req: Request, res: Response) => {
    console.log("adduser");
    const params = req.body;

    const { newUserId } = await addUser(params);
    res.json({ newUserId });
  });

  app.get("/users", async (_, res: Response) => {
    const { users } = await getUsers();
    res.json({ users });
  });
};

export default installUserRoutes;
