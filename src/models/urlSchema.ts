import mongoose from "mongoose";

export interface IUrl {
    original: string,
    short: string
}

const urlSchema = new mongoose.Schema<IUrl>({
    original: {type: String, required: true},
    short: {type: String, required: true}
})

export const URLModel = mongoose.model("url", urlSchema)