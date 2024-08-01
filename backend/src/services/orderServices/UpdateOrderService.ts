import { Decimal } from "@prisma/client/runtime/library";
import { OrderDTO } from "../../DTOs/orderDTO";
import prismaClient from "../../prisma";
import { validateFields } from "../../utils/validateFields";
import { validateStore } from "../../utils/validateStore";

class UpdateOrderStatusService {
  async execute(storeId: number, tabId: number, status: string) {
    validateFields({ storeId, tabId, status });
    validateStore(storeId);

    const tab = await prismaClient.costumerTab.findUnique({
      where: {
        id: tabId,
      },
    });

    await prismaClient.costumerTab.update({
      where: { id: tab?.id },
      data: { tabStatus: status },
    });

    return { message: `Order status has been updated to "${status}".` };
  }
}
export { UpdateOrderStatusService };
