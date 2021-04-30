import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import bcrypt from 'bcrypt'

export interface User {
    email: string,
    password: string,
}

export interface UserDocument extends User, mongoose.Document {
    isValidPassword(password: string): boolean;
}

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

UserSchema.pre<UserDocument>('save', async function (next) {
    this.password  = await bcrypt.hash(this.password, 10);
    next();
})

UserSchema.methods.isValidPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

export const Users = mongoose.model<UserDocument>("Users", UserSchema)
