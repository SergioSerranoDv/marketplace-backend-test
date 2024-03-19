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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const UserRepositorie_1 = require("../Repositories/UserRepositorie");
const Authentication_1 = require("../middleware/Authentication");
class UserRouter {
    constructor(userController) {
        this.createNewUserAndReturnToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userInfo = req.body;
                const response = yield this.userController.createUser(userInfo);
                if (response.status === "success") {
                    return res.status(response.code).json({
                        status: response.status,
                        message: response.message,
                        data: response.data,
                    });
                }
                else {
                    return res.status(response.code).json({
                        status: response.status,
                        message: response.message,
                    });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
        this.router = (0, express_1.Router)();
        this.userController = userController;
        this.router.post("/create", this.createNewUserAndReturnToken);
        this.router.get("/verifyToken", Authentication_1.Authentication.veirifyToken);
    }
    static getRouter() {
        if (!UserRouter.instance) {
            const userRepository = new UserRepositorie_1.MongoDBUserRepository();
            const userController = new UserController_1.UserController(userRepository);
            UserRouter.instance = new UserRouter(userController);
        }
        return UserRouter.instance.router;
    }
}
exports.UserRouter = UserRouter;
