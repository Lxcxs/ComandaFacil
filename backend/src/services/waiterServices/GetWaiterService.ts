import prismaClient from "../../prisma";

class GetWaiterService {
  async execute() {
    const result = await prismaClient.waiter.findMany();

    return result;
  }
}

export { GetWaiterService };
