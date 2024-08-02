import { Decimal } from "@prisma/client/runtime/library";
import { OrderDTO } from "../../DTOs/orderDTO";
import prismaClient from "../../prisma";

export class UpdateTabService {
  private sumValues(items: OrderDTO[]): Decimal {
    return items.reduce(
      (total: Decimal, item) => total.plus(item.orderValue),
      new Decimal(0)
    );
  }

  async execute(costumerId: number) {
    try {
      const items = await prismaClient.order.findMany({
        where: { costumerId },
      });

      if (!items.length) throw new Error("Service: No orders found.");

      const tabId = items[0].costumerTabId;
      if (!tabId) throw new Error("Service: Tab ID not found.");

      const result = await prismaClient.costumerTab.update({
        where: { id: tabId },
        data: { tabValue: this.sumValues(items) },
      });

      return result;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error updating tab'}`);
    }
  }
}
