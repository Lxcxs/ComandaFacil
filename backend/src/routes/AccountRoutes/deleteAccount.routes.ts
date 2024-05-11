import { Router } from "express";
import { DeleteAccountController } from "../../controller/User/DeleteAccountController";

const deleteAccount = new DeleteAccountController();

const deleteAccountRoutes = Router();

deleteAccountRoutes.delete("/", deleteAccount.handle);

export { deleteAccountRoutes };
