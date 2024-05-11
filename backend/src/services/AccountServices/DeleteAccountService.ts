import { PrismaPromise } from "@prisma/client";
import prismaClient from "../../prisma";

interface DeleteAccountDTO {
  id: number;
}

class DeleteAccountServive {
  async execute({ id }: DeleteAccountDTO) {
    
    if (!id) {
      throw new Error(`This id was not found.`);
    }

    const findUser = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    if (!findUser) {
      throw new Error("User not found.")
    } else {

      await prismaClient.user.delete({
        where: {
          id: findUser?.id,
        },
      });
  
      return { message: "Account deleted Sucefull!" };
    }
  }
}

export { DeleteAccountServive };
