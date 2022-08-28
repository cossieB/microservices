"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Issues = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const issueScheme = new mongoose_1.default.Schema({
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_by: { type: String, required: true },
    project: { type: String, required: true },
    assigned_to: { type: String, default: '' },
    status_text: { type: String, default: '' },
    created_on: Date,
    updated_on: Date,
    open: Boolean,
});
exports.Issues = mongoose_1.default.model('Issue', issueScheme);
