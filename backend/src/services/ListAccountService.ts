import prismaClient from "../prisma";

class ListAccountService {
  async execute() {
    
    const result = await prismaClient.user.findMany();

    return result;
  }
}

export { ListAccountService };
