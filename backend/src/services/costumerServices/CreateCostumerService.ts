import { validateFields } from "../../utils/validateFields";
import { CreateCostumerDTO } from "../../DTOs/costumerDTO";
import prismaClient from "../../prisma";
import { validateStore } from "../../utils/validateStore";

class CreateCustomerService {
  private static readonly ACCOUNT_TYPE = "costumer";

  async execute({ costumerName, costumerTable, accountType, tableId, storeId }: CreateCostumerDTO) {
    validateFields({ costumerName, costumerTable, accountType, tableId, storeId});

    const existingStore = await validateStore(storeId);
    const result = await prismaClient.costumer.create({
      data: {
        costumerName,
        costumerTable,
        accountType: CreateCustomerService.ACCOUNT_TYPE,
        tableId,
        storeId: existingStore.id
      }
    });
    return result;
  }
}
export { CreateCustomerService };