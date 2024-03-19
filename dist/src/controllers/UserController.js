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
exports.UserController = void 0;
const User_1 = require("../models/User");
const Authentication_1 = require("../middleware/Authentication");
class UserController {
    constructor(userRepository) {
        this.createUser = (userInfo) => __awaiter(this, void 0, void 0, function* () {
            try {
                //verify if the user already exists
                const userExists = yield this.userRepository.findByEmail(userInfo.email);
                if (userExists) {
                    return {
                        code: 409,
                        status: "error",
                        message: "El usuario ya existe",
                    };
                }
                const newUser = new User_1.User(userInfo);
                yield newUser.save();
                const payload = {
                    userId: newUser._id,
                    email: newUser.email,
                    role: newUser.roles[0],
                };
                const token = yield Authentication_1.Authentication.generateToken(payload);
                return {
                    code: 201,
                    message: "Usuario creado exitosamente",
                    status: "success",
                    data: {
                        user: newUser,
                        token: token,
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
        this.userRepository = userRepository;
    }
}
exports.UserController = UserController;
