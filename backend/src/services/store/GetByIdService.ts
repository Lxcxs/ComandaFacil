import prismaClient from "../../prisma";

interface GetById {
  userId: number;
}

export class GetStoreByIdService {
  async execute({ userId }: GetById) {
    try {
      const result = await prismaClient.store.findMany({
        where: { userId }
      });

      return result;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error retrieving store by ID'}`);
    }
  }
}
