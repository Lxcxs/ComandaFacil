import { Request, Response } from "express";
import { GetUserService } from "../../services/user/GetService";

export class GetUserController {
  async handle(req: Request, res: Response) {
    try {
      const getUserService = new GetUserService();
      const result = await getUserService.execute();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error getting user.'}` });
    }
  }
}