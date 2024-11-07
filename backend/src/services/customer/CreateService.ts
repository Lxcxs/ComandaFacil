import { CreateCostumerDTO } from "../../DTOs/costumerDTO";
import { validateFields } from "../../utils/validateFields";
import { validateStore } from "../../utils/validateStore";
import prismaClient from "../../prisma";
import jwt from "jsonwebtoken";
import { CreateTabService } from "../tab/CreateService";
import { UpdateTableStatusService } from "../table/UpdateStatusService";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

export class SigninCostumerService {
  private static readonly ACCOUNT_TYPE = "costumer";
  private static readonly COSTUMER_STATUS = "online";

  async execute({
    tableNumber,
    tablePeopleAmount,
    waiterId,
    storeId,
    name,
  }: CreateCostumerDTO) {
    try {
      const store = await validateStore(storeId);
      const tabService = new CreateTabService();
      const updateTableStatusService = new UpdateTableStatusService(); // Instanciar o serviço de atualização

      const table = await prismaClient.table.findFirst({
        where: {
          number: tableNumber,
        },
      });

      if (!table || table.status === "occupied") {
        throw new Error("error finding table or table occupied.");
      }

      const customer = await prismaClient.customer.create({
        data: {
          name,
          tableNumber: table.number,
          status: SigninCostumerService.COSTUMER_STATUS,
          accountType: SigninCostumerService.ACCOUNT_TYPE,
          tableId: table.id,
          storeId: store.id,
        },
      });
      console.log(customer)

      await updateTableStatusService.execute(store.id, table.id, "occupied");

      const tab = await tabService.execute(customer.id, storeId, table.id);
      
      const findTab = await prismaClient.customerTab.findFirst({
        where: { id: tab.id },
      });
      if (findTab) console.log("comanda criada.");
      if (!findTab) console.log("erro ao criar comanda");

      // Criar token login
      const token = jwt.sign(
        {
          customerId: customer.id,
          customerName: name,
          table: table.id,
          storeId: storeId
        },
        SECRET_KEY,
        { expiresIn: "5h" }
      );

      return { token, customer };
    } catch (error) {
      throw new Error(
        `Service: ${
          error instanceof Error ? error.message : "error signing in customer"
        }`
      );
    }
  }
}
