import mongoose from 'mongoose'
import {Schema} from 'mongoose'

export interface IUser {
    username: string,
    log: {
        description: string,
        duration: number,
        date: Date
    }[]
}

const userSchema = new Schema<IUser>({
    username: {type: String, required: true},
    log: [{
        description: String,
        duration: Number,
        date: Date
    }]
}, {versionKey: false})

export const Users = mongoose.model('User', userSchema)