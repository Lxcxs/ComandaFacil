import { Router } from "express";
import { CreateStoreController } from "../../controller/store/Create";
import { GetStoreController } from "../../controller/store/Get";
import { GetStoreByIdController } from "../../controller/store/GetById";
import { UpdateStoreStatusController } from "../../controller/store/UpdateStoreStatus";
import { authenticateToken } from "../../middleware/autenticateToken";

const createStoreCtrl = new CreateStoreController();
const getStoreCtrl = new GetStoreController();
const getStoreByIdCtrl = new GetStoreByIdController();
const updateStoreStatusCtrl = new UpdateStoreStatusController();

const storeRouter = Router();

storeRouter.post("/", createStoreCtrl.handle);
storeRouter.get("/" , getStoreCtrl.handle);
storeRouter.get("/:storeId", getStoreByIdCtrl.handle);
storeRouter.put("/:storeId", updateStoreStatusCtrl.handle);

export { storeRouter };
