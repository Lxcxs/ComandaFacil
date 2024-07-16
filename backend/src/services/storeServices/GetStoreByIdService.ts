import prismaClient from "../../prisma";

interface GetById {
  userId: number;
}

class GetStoreByIdService {
  async execute({ userId }: GetById) {
    
    const result = await prismaClient.store.findMany({
      where: {
        userId
      }
    });

    return result;
  }
}

export { GetStoreByIdService };
