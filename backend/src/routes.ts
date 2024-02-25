import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { request } from "http";
import { CreateAccountController } from "./controllers/CreateAccountController";
import { ListAccountController } from "./controllers/ListAccountController";
import { DeleteAccountController } from "./controllers/DeleteAccountController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

  // fastify.get("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
  //   return {ok: true, status: 'rodando'}
  // })

  fastify.post("/criar", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateAccountController().handle(request, reply)
  })

  fastify.get("/contas", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListAccountController().handle(request, reply)
  })

  fastify.delete("/excluir", async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteAccountController().handle(request, reply)
  })
}