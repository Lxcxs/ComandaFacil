"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("../../controller/User/CreateUserController");
const GetUserController_1 = require("../../controller/User/GetUserController");
const createUserCtrl = new CreateUserController_1.CreateUserController();
const getUserCtrl = new GetUserController_1.GetUserController();
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post("/", createUserCtrl.handle);
userRouter.get("/", getUserCtrl.handle);
userRouter.get("/:id", getUserCtrl.handle);
//# sourceMappingURL=userRoutes.routes.js.map