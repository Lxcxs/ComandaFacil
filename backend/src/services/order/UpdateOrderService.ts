import { Decimal } from "@prisma/client/runtime/library";
import { OrderDTO } from "../../DTOs/orderDTO";
import prismaClient from "../../prisma";
import { validateFields } from "../../utils/validateFields";
import { validateStore } from "../../utils/validateStore";

export class UpdateOrderStatusService {
  async execute(storeId: number, tabId: number, status: string) {
    try {
      validateFields({ storeId, tabId, status });
      await validateStore(storeId);

      const tab = await prismaClient.costumerTab.findUnique({
        where: { id: tabId },
      });

      if (!tab) throw new Error("Service: Tab not found.");

      await prismaClient.costumerTab.update({
        where: { id: tabId },
        data: { tabStatus: status },
      });

      return { message: `Order status has been updated to "${status}".` };
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error updating order status'}`);
    }
  }
}