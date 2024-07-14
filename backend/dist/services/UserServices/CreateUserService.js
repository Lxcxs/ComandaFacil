"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateUserService {
    execute({ userName, userEmail, userPassword, userDocument }) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountType = "admin";
            if (!userName || !userEmail || !userPassword || !userDocument) {
                throw new Error("Error: Please fill in all fields");
            }
            const [documentAlreadyExists, emailAlreadyExists] = yield Promise.all([
                prisma_1.default.user.findFirst({
                    where: { userDocument },
                }),
                prisma_1.default.user.findFirst({
                    where: { userEmail },
                }),
            ]);
            if (documentAlreadyExists) {
                throw new Error("Error: This document is already in use.");
            }
            if (emailAlreadyExists) {
                throw new Error("Error: This email is already in use.");
            }
            const user = yield prisma_1.default.user.create({
                data: {
                    userName,
                    userEmail,
                    userPassword,
                    userDocument,
                    accountType,
                },
            });
            return user;
        });
    }
}
exports.CreateUserService = CreateUserService;
//# sourceMappingURL=CreateUserService.js.map