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
exports.Authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Authentication {
    static veirifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenAuthorization = req.headers.authorization;
            if (!tokenAuthorization)
                return res.status(403).json({ message: "Unauthorized" });
            try {
                const token = tokenAuthorization.split(" ")[1];
                const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                req.payload = payload;
                return next();
            }
            catch (error) {
                return res.status(403).json({ message: "Unauthorized" });
            }
        });
    }
    static generateToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
            return token;
        });
    }
    static verifyTokenApi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenAuthorization = req.headers.authorization;
            if (!tokenAuthorization)
                return res.status(403).json({ message: "Unauthorized" });
            try {
                const token = tokenAuthorization.split(" ")[1];
                const payload = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                if (payload) {
                    return res.status(200).json({
                        message: "Authorized",
                        data: {
                            email: payload.email,
                            role: payload.role,
                        },
                    });
                }
            }
            catch (error) {
                return res.status(403).json({ message: "Unauthorized" });
            }
        });
    }
}
exports.Authentication = Authentication;
