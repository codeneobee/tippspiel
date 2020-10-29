import express from 'express'
import {CreateUsersRequest} from "./create-users-request";
import {UserDocument, Users} from "./user.schema";

export class UsersController {
    static createUser(req: express.Request, res: express.Response) {
        let user;
        try {
            user = CreateUsersRequest.fromObject(req.body.user);
        } catch (e) {
            return res.status(400).json({message: e.message});
        }

        const savedUser: UserDocument = new Users(user);
        savedUser.setPassword(user.password);

        return savedUser.save().then(() => {
            res.status(201).json({
                user: savedUser.toAuthJSON()
            })
        })
    }
}