import bcrypt from "bcrypt";
import prismaClient from "../../prisma";
import { validateFields } from "../../utils/validateFields"; // Atualize o caminho conforme necessário
import { CreateWaiterDTO } from "../../DTOs/waiterDTO";
class CreateWaiterService {
  private static readonly SALT_ROUNDS = 10;
  private static readonly ACCOUNT_TYPE = "employee";

  async execute({ waiterName, waiterEmail, waiterPassword, storeId, token }: CreateWaiterDTO) {

    validateFields( { waiterName, waiterEmail, waiterPassword, storeId } );

    const existingStore = await prismaClient.store.findFirst({
      where: { id: storeId },
    });
    if (!existingStore) {
      throw new Error('Store not found.');
    }

    const userStoreValidation = await prismaClient.store.findFirst({
      where: { userId: token?.userId },
    });

    if (userStoreValidation?.id !== existingStore.id) {
      throw new Error("This store isn't from this user.");
    }

    const hashedPassword = await bcrypt.hash(waiterPassword, CreateWaiterService.SALT_ROUNDS);
    
    return prismaClient.waiter.create({
      data: {
        waiterName,
        waiterEmail,
        waiterPassword: hashedPassword,
        storeId: existingStore.id,
        accountType: CreateWaiterService.ACCOUNT_TYPE,
      },
    });
  }
}

export { CreateWaiterService };
