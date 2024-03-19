"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootRouter = void 0;
const express_1 = require("express");
const UserRouter_1 = require("./UserRouter");
const AuthRouter_1 = require("./AuthRouter");
const ProductRouter_1 = require("./ProductRouter");
class RootRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.get("/v1", (req, res) => {
            res.send("Welcome to the API");
        });
        this.router.use("/v1/user/", UserRouter_1.UserRouter.getRouter());
        this.router.use("/v1/auth/", AuthRouter_1.AuthRouter.getRouter());
        this.router.use("/v1/products/", ProductRouter_1.ProductRouter.getRouter());
    }
    static getRouter() {
        if (!RootRouter.instance) {
            RootRouter.instance = new RootRouter();
        }
        return RootRouter.instance.router;
    }
}
exports.RootRouter = RootRouter;
