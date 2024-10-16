import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class GetUserByIdService {
  async execute(userId: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: Number(userId),
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error getting user by id.'}`);
    }
  }
}
