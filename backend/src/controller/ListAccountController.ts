import { Request, Response } from "express";
import { ListAccountService } from "../services/ListAccountService";

class ListAccountController {
  async handle(req: Request, res: Response) {

    const listAccountService = new ListAccountService();

    const result = await listAccountService.execute();

    res.status(201).send(result);
  }
}

export { ListAccountController };
