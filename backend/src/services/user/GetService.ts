import prismaClient from "../../prisma";

export class GetUserService {
  async execute() {
    try {
      return await prismaClient.user.findMany();
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error fetching users'}`);
    }
  }
}
