import { Express, Request, Response } from "express";
import { addUser, getUsers } from "./controllers/userController";

const installRoutes = (app: Express) => {
  // @todo should be post request
  app.get("/addUser", async (req: Request, res: Response) => {
    const { username, email, coins } = req.query;
    // @todo: figure out some way to typecheck args
    // forcing compiler to treat as what I want it to
    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof coins !== "number"
    ) {
      return { newUserId: undefined };
    }
    const { newUserId } = await addUser({ username, email, coins });
    res.json({ newUserId });
  });

  app.get("/users", async (req: Request, res: Response) => {
    console.log(process.env.SERVER_BASE_URL);
    const { users } = await getUsers();
    res.json({ users });
  });
};

export default installRoutes;
