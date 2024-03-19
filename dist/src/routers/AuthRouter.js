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
exports.AuthRouter = void 0;
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const Authentication_1 = require("../middleware/Authentication");
class AuthRouter {
    constructor() {
        this.handleLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userInfo = req.body;
                if (!userInfo.email || !userInfo.password) {
                    return res.status(400).json({
                        status: "error",
                        message: "Email and password are required",
                    });
                }
                const response = yield this.authController.login(userInfo);
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
        this.authController = new AuthController_1.AuthController();
        this.router.get("/verifyTokenApi", Authentication_1.Authentication.verifyTokenApi);
        this.router.post("/login", this.handleLogin);
    }
    static getRouter() {
        if (!AuthRouter.instance) {
            AuthRouter.instance = new AuthRouter();
        }
        return AuthRouter.instance.router;
    }
}
exports.AuthRouter = AuthRouter;
