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
exports.ProductController = void 0;
class ProductController {
    constructor(productRepository) {
        this.createProduct = (productInfo, userId, email) => __awaiter(this, void 0, void 0, function* () {
            try {
                //verify if the product already exists
                const productExists = yield this.productRepository.findBySkuAndUserId(productInfo.sku, userId);
                if (productExists) {
                    return {
                        code: 409,
                        status: "error",
                        message: "El producto ya existe",
                    };
                }
                const product = yield this.productRepository.create({
                    user: userId,
                    email: email,
                    sku: productInfo.sku,
                    name: productInfo.name,
                    amount: productInfo.amount,
                    price: productInfo.price,
                });
                return {
                    code: 201,
                    status: "success",
                    message: "Producto creado exitosamente",
                    data: {
                        product: product,
                    },
                };
            }
            catch (error) {
                return {
                    code: 500,
                    status: "error",
                    message: error.message,
                };
            }
        });
        this.productRepository = productRepository;
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productRepository.findAll();
                return {
                    code: 200,
                    status: "success",
                    data: products,
                };
            }
            catch (error) {
                return {
                    code: 500,
                    status: "error",
                    message: error.message,
                };
            }
        });
    }
    getUserProductsById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productRepository.findByUserId(userId);
                return {
                    code: 200,
                    message: "Productos encontrados exitosamente",
                    status: "success",
                    data: products,
                };
            }
            catch (error) {
                return {
                    code: 500,
                    status: "error",
                    message: error.message,
                };
            }
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productRepository.deleteById(productId);
                if (product) {
                    return {
                        code: 200,
                        status: "success",
                        message: "Producto eliminado exitosamente",
                        data: product,
                    };
                }
                else {
                    return {
                        code: 404,
                        status: "error",
                        message: "Product not found",
                    };
                }
            }
            catch (error) {
                return {
                    code: 500,
                    status: "error",
                    message: error.message,
                };
            }
        });
    }
    updateProduct(productId, productInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productRepository.updateById(productId, productInfo);
                if (product) {
                    return {
                        code: 200,
                        status: "success",
                        message: "Producto actualizado exitosamente",
                        data: product,
                    };
                }
                else {
                    return {
                        code: 404,
                        status: "error",
                        message: "Product not found",
                    };
                }
            }
            catch (error) {
                return {
                    code: 500,
                    status: "error",
                    message: error.message,
                };
            }
        });
    }
}
exports.ProductController = ProductController;
