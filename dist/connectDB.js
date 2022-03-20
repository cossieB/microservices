"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function default_1() {
    try {
        mongoose_1.default.connect(process.env.MONGO_URI);
    }
    catch (e) {
        console.log(e);
    }
}
exports.default = default_1;
