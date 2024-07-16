import prismaClient from "../../prisma";

class GetStoreService {
  async execute() {
    
    const result = await prismaClient.store.findMany();

    return result;
  }
}

export { GetStoreService };
