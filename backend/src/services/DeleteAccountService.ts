import { PrismaPromise } from "@prisma/client";
import prismaClient from "../prisma";
import { AppError } from "../errors/AppError";

interface DeleteAccountDTO {
  id: string;
}

class DeleteAccountServive {
  async execute({ id }: DeleteAccountDTO) {
    
    if (!id) {
      throw new AppError(`This id was not found.`, 400);
    }

    const findAccount = await prismaClient.account.findFirst({
      where: {
        id,
      },
    });

    await prismaClient.account.delete({
      where: {
        id: findAccount?.id,
      },
    });

    return { message: "Account deleted Sucefull!" };
  }
}

export { DeleteAccountServive };
