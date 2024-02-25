import { FastifyRequest, FastifyReply } from "fastify";

import { DeleteAccountService } from "../services/DeleteAccountService";

class DeleteAccountController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string };

    const accountService = new DeleteAccountService();

    const account = await accountService.execute({ id });

    reply.send(account);
  }
}

export { DeleteAccountController };
