import { FastifyRequest, FastifyReply } from "fastify";
import { CreateAccountService } from "../services/CreateAccountService";
import { CreateAccountProps } from "../types/CreateAccountProps";

class CreateAccountController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password, table_amount } = request.body as CreateAccountProps;
    const accountService = new CreateAccountService();
    const account = await accountService.execute({ name, email, password, table_amount });

    reply.send(account);
  }
}

export { CreateAccountController };
