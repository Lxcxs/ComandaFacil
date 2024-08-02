import { CreateCostumerDTO } from "../../DTOs/costumerDTO";
import { validateFields } from "../../utils/validateFields";
import { validateStore } from "../../utils/validateStore";
import prismaClient from "../../prisma";
import { CreateTableService } from "../table/CreateService";
import jwt from "jsonwebtoken";
import { CreateTabService } from "../tab/CreateService";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

export class SigninCostumerService {
  private static readonly ACCOUNT_TYPE = "costumer";

  async execute({
    tableNumber,
    tablePeopleAmount,
    waiterId,
    storeId,
    costumerName,
  }: CreateCostumerDTO) {
    try {
      validateFields({ tableNumber, tablePeopleAmount, storeId, costumerName });

      const store = await validateStore(storeId);

      const tableService = new CreateTableService();
      const tabService = new CreateTabService();

      const table = await tableService.execute({
        tableNumber,
        tablePeopleAmount,
        storeId,
        waiterId,
      });

      const costumer = await prismaClient.costumer.create({
        data: {
          costumerName,
          costumerTable: table.tableNumber,
          accountType: SigninCostumerService.ACCOUNT_TYPE,
          tableId: table.id,
          storeId: store.id,
        },
      });

      const tab = await tabService.execute(costumer.id, storeId, table.id);

      const token = jwt.sign(
        {
          costumerId: costumer.id,
          costumerName: costumerName,
          table: table.id,
          peopleAmount: table.tablePeopleAmount,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return { token, table, costumer, tab };
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error signing in customer'}`);
    }
  }
}
