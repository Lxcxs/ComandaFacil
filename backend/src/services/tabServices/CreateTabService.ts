import { Decimal } from "@prisma/client/runtime/library";
import prismaClient from "../../prisma";
import { validateFields } from "../../utils/validateFields";

class CreateTabService {
  private static readonly TAB_STATUS = "open";

  async execute(costumerId: number, storeId: number, tableId: number) {
    validateFields({ costumerId, storeId, tableId });

    const data = {
      tabValue: new Decimal(0),
      tabStatus: CreateTabService.TAB_STATUS,
      costumerId,
      storeId,
      tableId,
    };
    const tab = await prismaClient.costumerTab.create({
      data: data,
    });

    return tab;
  }
}
export { CreateTabService };