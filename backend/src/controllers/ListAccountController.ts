import { FastifyRequest, FastifyReply } from "fastify";
import { ListAccountService } from "../services/ListAccountService";

class ListAccountController{

  async handle( request: FastifyRequest, reply: FastifyReply) {
    const listAccountsService = new ListAccountService();

    const accounts = await listAccountsService.execute();

    reply.send(accounts)
  }
}

export { ListAccountController }