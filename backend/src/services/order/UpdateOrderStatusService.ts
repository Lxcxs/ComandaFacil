import prismaClient from "../../prisma";
import { validateFields } from "../../utils/validateFields";
import { validateStore } from "../../utils/validateStore";

export class UpdateOrderStatusService {
  async execute(storeId: number, newStatus: string, orderId: number) {
    try {
      // Validação do ID da loja
      validateFields({ storeId });
      const store = await validateStore(storeId); // Descomente se a validação da loja for necessária

      // Validação do novo status
      const validStatuses = ["waiting", "producing", "finished", "canceled"];
      if (!validStatuses.includes(newStatus)) {
        throw new Error(`Service: invalid status "${newStatus}". Valid statuses are: ${validStatuses.join(', ')}.`);
      }

      // Busca o pedido
      const findOrder = await prismaClient.order.findUnique({
        where: { id: orderId },
      });

      if (!findOrder) {
        throw new Error(`Service: error finding order with ID ${orderId}.`);
      }

      // Atualiza o status do pedido
      await prismaClient.order.update({
        where: { id: orderId },
        data: { status: newStatus },
      });

      return { message: `Order status has been updated to "${newStatus}".` };
    } catch (error) {
      throw new Error(
        `Service: ${error instanceof Error ? error.message : "error updating order status"}`
      );
    }
  }
}
