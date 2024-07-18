import { Router } from "express";
import { LoginController } from "../../controller/Login/LoginController";


const loginCtrl = new LoginController();

const loginRouter = Router();

loginRouter.post("/", loginCtrl.handle);


export { loginRouter };