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
exports.MongoDBUserRepository = void 0;
const User_1 = require("../models/User");
class MongoDBUserRepository {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.findOne({ email }).exec();
        });
    }
    create(UserData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new User_1.User(UserData).save();
        });
    }
}
exports.MongoDBUserRepository = MongoDBUserRepository;
