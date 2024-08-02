import prismaClient from "../../prisma";

export class GetItemService {
  async execute() {
    try {
      const items = await prismaClient.item.findMany();
      return items;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error retrieving items'}`);
    }
  }
}