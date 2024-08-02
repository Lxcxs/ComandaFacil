import prismaClient from "../../prisma";

export class GetStoreService {
  async execute() {
    try {
      const result = await prismaClient.store.findMany();
      return result;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error retrieving stores'}`);
    }
  }
}