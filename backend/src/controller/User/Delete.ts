import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteService";

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const userService = new DeleteUserService();
      const result = await userService.execute({ id });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error deleting user.'}` });
    }
  }
}