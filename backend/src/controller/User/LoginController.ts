import { Request, Response } from "express";
import { AuthenticateUserService } from "../../services/loginServices/LoginService";

class LoginController {
  async handle(req: Request, res: Response) {

    const { userEmail, userPassword } = req.body;
    const authenticateUserService = new AuthenticateUserService();

    const { token, user } = await authenticateUserService.execute({
      userEmail,
      userPassword,
    });

    return res.json({ token, user });
  }
}

export { LoginController };
