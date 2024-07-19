import { Request, Response } from "express";
import { DeleteUserService } from "../../services/userServices/DeleteUserService";

class DeleteUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const userService = new DeleteUserService();

    const result = await userService.execute({ id });

    res.status(200).send(result);
  }
}

export { DeleteUserController };
