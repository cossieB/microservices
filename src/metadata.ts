import express from 'express';
import multer from 'multer';

const upload = multer({limits: {fileSize: 5 * 1024 * 1024}})

export const metadataRouter = express.Router()

metadataRouter.post('/', upload.single('file'), (req, res) => {
    console.log(req.file, req.body)
    const {originalname, encoding, mimetype, size} = req.file!
    res.json({originalname, encoding, mimetype, size})
})