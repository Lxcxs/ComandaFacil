import { Decimal } from "@prisma/client/runtime/library";
import prismaClient from "../../prisma";
import { validateFields } from "../../utils/validateFields";

export class CreateTabService {
  private static readonly TAB_STATUS = "open";

  async execute(customerId: number, storeId: number, tableId: number) {
    try {
      validateFields({ customerId, storeId, tableId });

      const data = {
        value: new Decimal(0),
        status: CreateTabService.TAB_STATUS,
        customerId,
        storeId,
        tableId,
      };

      return await prismaClient.customerTab.create({ data });
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error creating tab'}`);
    }
  }
}
