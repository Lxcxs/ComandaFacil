import prismaClient from "../../prisma";
export class GetStoreByIdService {
  async execute(storeId: number) {
    try {
      const result = await prismaClient.store.findFirst({
        where: { id: storeId }
      });

      return result;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error retrieving store by ID'}`);
    }
  }
}
