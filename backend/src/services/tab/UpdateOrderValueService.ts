import { Prisma } from "@prisma/client";
import { OrderDTO } from "../../DTOs/orderDTO";
import prismaClient from "../../prisma";

export class UpdateTabValueService {
  private sumValues(items: OrderDTO[]): number {
    return items.reduce((total, item) => {
      const orderValue = typeof item.orderValue === 'string'
        ? parseFloat(item.orderValue)
        : item.orderValue || 0;
      return total + orderValue;
    }, 0);
  }

  async execute(costumerId: number) {
    try {
      const items = await prismaClient.order.findMany({
        where: { costumerId },
      });

      if (!items.length) throw new Error("Service: No orders found.");

      const tabId = items[0].costumerTabId;
      if (!tabId) throw new Error("Service: Tab ID not found.");

      const normalizedItems = items.map(item => ({
        ...item,
        orderValue: (item.orderValue as Prisma.Decimal).toNumber(),
      }));

      const tabValue = new Prisma.Decimal(this.sumValues(normalizedItems));

      const result = await prismaClient.costumerTab.update({
        where: { id: tabId },
        data: { tabValue },
      });

      return result;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error updating tab'}`);
    }
  }
}
