"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const App_1 = require("./App");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
class Server {
    static getInstance() {
        if (!Server.instance) {
            mongoose_1.default.connect(process.env.MONGO_URI, {}).then(() => {
                Server.instance = App_1.App.getInstance().listen(process.env.PORT, () => {
                    console.log(`Server is running on port ${process.env.PORT}`);
                });
                console.log("Connected to MongoDB");
            });
        }
        return Server.instance;
    }
}
exports.Server = Server;
