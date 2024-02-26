import { Router } from "express";
import { accountRoutes } from "./account.routes";
import { listAccountRoutes } from "./listAccount.routes";
import { deleteAccountRoutes } from "./deleteAccount.routes";
import { updateAccountRoutes } from "./updateAccount.routes";

const routes = Router();

routes.use("/contas", accountRoutes);
routes.use("/lista", listAccountRoutes);
routes.use("/lista", deleteAccountRoutes);
routes.use("/lista", updateAccountRoutes);

export { routes };
