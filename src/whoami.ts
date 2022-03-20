import express from 'express';

export const whoAmIRouter = express.Router()

whoAmIRouter.get("/", (req, res) => {
    let software = req.headers["user-agent"]
    res.json({"ipaddress": req.ip, "language": req.headers["accept-language"], "software": software})
})