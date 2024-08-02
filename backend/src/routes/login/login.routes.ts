import { Router } from "express";
import { LoginController } from "../../controller/Login/Login";


const loginCtrl = new LoginController();

const loginRouter = Router();

loginRouter.post("/", loginCtrl.handle);


export { loginRouter };