"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    sku: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Product = mongoose_2.default.model("Products", ProductSchema);
