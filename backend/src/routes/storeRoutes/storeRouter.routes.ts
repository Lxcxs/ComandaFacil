import { Router } from "express";
import { CreateStoreController } from "../../controller/store/CreateStoreController";
import { GetStoreController } from "../../controller/store/GetStoreController";
import { GetStoreByIdController } from "../../controller/store/GetStoreByIdController";
import { UpdateStoreStatusController } from "../../controller/store/UpdateStoreStatusController";
import { authenticateToken } from "../../middleware/autenticateToken";

const createStoreCtrl = new CreateStoreController();
const getStoreCtrl = new GetStoreController();
const getStoreByIdCtrl = new GetStoreByIdController();
const updateStoreStatusCtrl = new UpdateStoreStatusController();

const storeRouter = Router();

storeRouter.post("/", createStoreCtrl.handle);
storeRouter.get("/" , getStoreCtrl.handle);
storeRouter.get("/:userId", authenticateToken ,getStoreByIdCtrl.handle);
storeRouter.put("/:userId", authenticateToken ,updateStoreStatusCtrl.handle);

export { storeRouter };
