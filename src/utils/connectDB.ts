import mongoose from "mongoose";

export default async function() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
    }
    catch(e: any) {
        console.log(e)
    }
}