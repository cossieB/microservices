"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const userSchema = new mongoose_2.Schema({
    username: { type: String, required: true },
    log: [{
            description: String,
            duration: Number,
            date: Date
        }]
}, { versionKey: false });
exports.Users = mongoose_1.default.model('User', userSchema);
