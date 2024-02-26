import prismaClient from "../prisma";

class ListAccountService {
  async execute() {
    
    const result = await prismaClient.account.findMany();

    return result;
  }
}

export { ListAccountService };
