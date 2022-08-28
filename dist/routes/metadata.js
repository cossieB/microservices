"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadataRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ limits: { fileSize: 5 * 1024 * 1024 } });
exports.metadataRouter = express_1.default.Router();
exports.metadataRouter.post('/', upload.single('file'), (req, res) => {
    console.log(req.file, req.body);
    const { originalname, encoding, mimetype, size } = req.file;
    res.json({ originalname, encoding, mimetype, size });
});
