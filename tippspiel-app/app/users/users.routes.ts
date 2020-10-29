import express from 'express'
import {auth} from "../auth";
import {UserDocument, Users} from './user.schema';
import {passport} from "../passport";
import {UsersController} from "./users.controller";
import {CreateUsersRequest} from "./create-users-request";

const userRoutes = express.Router()

userRoutes.post('/', auth.optional, (req, res) => {
    return UsersController.createUser(req, res);
});

userRoutes.post('/login', auth.optional, (req, res, next) => {
    // const user = req.body.user as CreateUsersRequest;
    //
    // const errorObject = user.validate();
    // if (errorObject.errors) return res.status(422).json(errorObject);
    //
    // return passport.authenticate('local', {session: false}, (err, passportUser) => {
    //     if (err) {
    //         return next(err);
    //     }
    //
    //     if (passportUser) {
    //         const user = passportUser;
    //         user.token = passportUser.generateJWT();
    //
    //         return res.json({user: user.toAuthJSON()});
    //     }
    //
    //     return res.sendStatus(400);
    // })(req, res, next);
});

userRoutes.get('/current', auth.required, (req: any, res, next) => {
    const id = req.payload.id;

    return Users.findById(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({user: user.toAuthJSON()});
        });
});

export {userRoutes}

