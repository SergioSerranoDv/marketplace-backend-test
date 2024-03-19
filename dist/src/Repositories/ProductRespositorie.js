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
exports.MongoDBProductRepository = void 0;
const Product_1 = require("../models/Product");
class MongoDBProductRepository {
    findBySkuAndUserId(sku, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Product_1.Product.findOne({ sku: sku, user: userId }).exec();
        });
    }
    create(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Product_1.Product(productData).save();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Product_1.Product.find().exec();
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Product_1.Product.find({ user: userId }).exec();
        });
    }
    deleteById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Product_1.Product.findByIdAndDelete(productId).exec();
        });
    }
    updateById(productId, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Product_1.Product.findByIdAndUpdate(productId, productData, { new: true }).exec();
        });
    }
}
exports.MongoDBProductRepository = MongoDBProductRepository;
