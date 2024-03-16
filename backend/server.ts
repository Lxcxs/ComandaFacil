import express, { Express, NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import "express-async-errors";
import { GetUserController } from "./src/controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./src/reporitories/get-users/mongo-get-users";
import { MongoClient } from "./src/database/mongo";

// const app: Express = express();

const main = async () => {
  config();
  
  const app = express();
  const port = process.env.PORT || 8000;
  await MongoClient.connect();

  app.get("/users", async (req: Request, res: Response) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUserController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });

  app.listen(port, () => {
    console.log(`Aplicação Rodando na porta: ${port}`);
  });
};

main();