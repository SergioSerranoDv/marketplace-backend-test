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
exports.ProductRouter = void 0;
const express_1 = require("express");
const ProductController_1 = require("../controllers/ProductController");
const ProductRespositorie_1 = require("../Repositories/ProductRespositorie");
const Authentication_1 = require("../middleware/Authentication");
class ProductRouter {
    constructor(productController) {
        this.createNewProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.payload) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                const userInfo = req.body;
                const userId = req.payload.userId;
                const email = req.payload.email;
                const response = yield this.productController.createProduct(userInfo, userId, email);
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
        this.getAllProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.productController.getAllProducts();
                if (response.code === 200) {
                    return res.status(200).json(response.data);
                }
                else {
                    return res.status(500).json({ message: response.message });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
        this.getUserProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.payload) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                const userId = req.payload.userId;
                const response = yield this.productController.getUserProductsById(userId);
                if (response.status === "success") {
                    return res.status(200).json({
                        status: response.status,
                        message: response.message,
                        data: response.data,
                    });
                }
                else {
                    return res.status(500).json({
                        status: response.status,
                        message: response.message,
                    });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.payload) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                const productId = req.params.id;
                const response = yield this.productController.deleteProduct(productId);
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
        this.updateProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.payload) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                const productId = req.params.id;
                const productInfo = req.body;
                const response = yield this.productController.updateProduct(productId, productInfo);
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
        this.productController = productController;
        this.router.get("/all", this.getAllProducts);
        this.router.use(Authentication_1.Authentication.veirifyToken);
        this.router.post("/new", this.createNewProduct);
        this.router.get("/user", this.getUserProducts);
        this.router.delete("/delete/:id", this.deleteProduct);
        this.router.put("/update/:id", this.updateProductById);
    }
    static getRouter() {
        if (!ProductRouter.instance) {
            const productRepository = new ProductRespositorie_1.MongoDBProductRepository();
            const productController = new ProductController_1.ProductController(productRepository);
            ProductRouter.instance = new ProductRouter(productController);
        }
        return ProductRouter.instance.router;
    }
}
exports.ProductRouter = ProductRouter;
