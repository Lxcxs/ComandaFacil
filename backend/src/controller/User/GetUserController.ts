import { Request, Response } from "express";
import { GetUserService } from "../../services/userServices/GetUserService";

class GetUserController {
  async handle(req: Request, res: Response) {

    const getUserService = new GetUserService();

    const result = await getUserService.execute();

    res.status(201).send(result);
  }
}

export { GetUserController };
