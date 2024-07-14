import prismaClient from "../../prisma";

class GetUserService {
  async execute() {
    
    const result = await prismaClient.user.findMany();

    return result;
  }
}

export { GetUserService };
