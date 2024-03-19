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
exports.AuthController = void 0;
const Authentication_1 = require("../middleware/Authentication");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
class AuthController {
    login(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = userInfo;
                //verify if the user exists
                const user = yield User_1.User.findOne({ email });
                if (!user) {
                    return {
                        code: 401,
                        status: "error",
                        message: "El usuario no existe",
                    };
                }
                //verify if the password is correct
                const isPasswordCorrect = user.password === password ? true : false;
                if (!isPasswordCorrect) {
                    return {
                        code: 401,
                        status: "error",
                        message: "Contraseña incorrecta",
                    };
                }
                const payload = {
                    userId: user._id,
                    email: user.email,
                    role: user.roles.map((role) => role),
                };
                const token = yield Authentication_1.Authentication.generateToken(payload);
                return {
                    code: 200,
                    status: "success",
                    message: "Usuario autenticado",
                    data: {
                        user,
                        token,
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
    }
    static verifyToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenAuthorization = req.headers.authorization;
            if (!tokenAuthorization)
                return res.status(403).json({ message: "Unauthorized" });
            try {
                const token = tokenAuthorization.split(" ")[1];
                const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                req.payload = payload;
                return res.status(200).json({ message: "Authorized" });
            }
            catch (error) {
                return res.status(403).json({ message: "Unauthorized" });
            }
        });
    }
}
exports.AuthController = AuthController;
