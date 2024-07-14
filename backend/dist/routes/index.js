"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const userRoutes_routes_1 = require("./UserRoutes/userRoutes.routes");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.use("/users", userRoutes_routes_1.userRouter);
//# sourceMappingURL=index.js.map