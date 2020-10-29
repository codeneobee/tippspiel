import * as mongoose from "mongoose";
import {Model, Schema} from "mongoose";
import * as crypto from "crypto"
import JWT from "jsonwebtoken"

export interface User {
    name: string,
    email: string,
    hash: string,
    salt: string,
}

export interface UserDocument extends User, mongoose.Document {
    setPassword(password: string): void;
    validatePassword(password: string): boolean;
    generateJWT(): string;
    toAuthJSON(): object
}

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    hash: {type: String, required: true},
    salt: {type: String, required: true}
});

UserSchema.methods.setPassword = function (password: string) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString("hex");
}

UserSchema.methods.validatePassword = function (password: string) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash == hash;
}

UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return JWT.sign({
        email: this.email,
        id: this._id,
        exp: expirationDate.getTime() / 1000,
    }, 'secret');
}

UserSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    }
}

export const Users = mongoose.model<UserDocument>("Users", UserSchema)