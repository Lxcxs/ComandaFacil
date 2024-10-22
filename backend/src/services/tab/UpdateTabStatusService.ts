import { Prisma } from "@prisma/client";
import prismaClient from "../../prisma";

export class UpdateTabStatusService {
  async execute(tabId: number, newStatus: string) {
    try {
      // Verifica se a comanda (tab) existe
      const currentTab = await prismaClient.costumerTab.findFirst({
        where: { id: tabId },
      });
      if (!currentTab) throw new Error("Service: costumer tab not found or does not exist.");

      // Busca a mesa associada à comanda
      const associatedTable = await prismaClient.table.findFirst({
        where: { id: currentTab.tableId as number },
      });
      if (!associatedTable) throw new Error("Service: associated table not found.");

      // Busca o cliente associado à mesa
      const associatedCostumer = await prismaClient.costumer.findFirst({
        where: { tableId: associatedTable.id },
      });
      if (!associatedCostumer) throw new Error("Service: associated costumer not found.");

      // Atualiza o status da comanda e remove a associação da mesa
      const updatedTab = await prismaClient.costumerTab.update({
        where: { id: tabId },
        data: { tabStatus: newStatus, tableId: null },
      });

      // Atualiza o cliente para "offline" e desassocia da mesa
      const desassociatedCostumer = await prismaClient.costumer.update({
        where: { id: associatedCostumer.id },
        data: { tableId: null, costumerStatus: "offline" },
      });

      return { updatedTab, desassociatedCostumer };
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error updating tab'}`);
    }
  }
}
