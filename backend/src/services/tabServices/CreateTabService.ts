import { Decimal } from "@prisma/client/runtime/library";
import prismaClient from "../../prisma";
import { validateFields } from "../../utils/validateFields";
import { OrderDTO } from "../../DTOs/orderDTO";

class CreateTabService {
  private static readonly TAB_STATUS = "open" 

  sumValues(items: OrderDTO[]): Decimal {
    return items.reduce((total: Decimal, item) => total.plus(item.orderValue), new Decimal(0));
  }

  async execute(costumerId: number, storeId: number, tableId: number) {
    validateFields({ costumerId, storeId, tableId});

    const items = await prismaClient.order.findMany({
      where: {
        costumerId,
      }
    });
    const data = {
      tabValue: this.sumValues(items),
      tabStatus: CreateTabService.TAB_STATUS,
      costumerId,
      storeId,
      tableId
    }
    const tab = await prismaClient.costumerTab.create({
      data: data
    });
    
    return tab;
  }
}
export { CreateTabService };