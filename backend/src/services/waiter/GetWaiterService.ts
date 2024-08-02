import prismaClient from "../../prisma";

export class GetWaiterService {
  async execute() {
    try {
      const result = await prismaClient.waiter.findMany();
      return result;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error retrieving waiters'}`);
    }
  }
}
