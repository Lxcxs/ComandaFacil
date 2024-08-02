import { Decimal } from "@prisma/client/runtime/library";
import prismaClient from "../../prisma";
import { validateFields } from "../../utils/validateFields";

export class CreateTabService {
  private static readonly TAB_STATUS = "open";

  async execute(costumerId: number, storeId: number, tableId: number) {
    try {
      validateFields({ costumerId, storeId, tableId });

      const data = {
        tabValue: new Decimal(0),
        tabStatus: CreateTabService.TAB_STATUS,
        costumerId,
        storeId,
        tableId,
      };

      return await prismaClient.costumerTab.create({ data });
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error creating tab'}`);
    }
  }
}
