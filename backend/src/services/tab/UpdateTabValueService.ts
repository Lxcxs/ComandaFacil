import { Prisma } from "@prisma/client";
import { OrderDTO } from "../../DTOs/orderDTO";
import prismaClient from "../../prisma";

export class UpdateTabValueService {
  private sumValues(items: OrderDTO[]): number {
    return items.reduce((total, item) => {
      const orderValue = typeof item.price === 'string'
        ? parseFloat(item.price)
        : item.price || 0;
      return total + orderValue;
    }, 0);
  }

  async execute(customerId: number) {
    try {
      const items = await prismaClient.order.findMany({
        where: { customerId },
      });

      if (!items.length) throw new Error("Service: No orders found.");

      const tabId = items[0].customerTabId;
      if (!tabId) throw new Error("Service: Tab ID not found.");

      const normalizedItems = items.map(item => ({
        ...item,
        price: (item.price as Prisma.Decimal).toNumber(),
      }));

      const tabValue = new Prisma.Decimal(this.sumValues(normalizedItems));

      const result = await prismaClient.customerTab.update({
        where: { id: tabId },
        data: { value: tabValue },
      });

      return result;
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error updating tab'}`);
    }
  }
}
