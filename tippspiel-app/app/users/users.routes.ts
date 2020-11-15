import express from 'express'
import {JWT_PRIVATE_KEY, passport} from "../passport";
import jwt from 'jsonwebtoken';
import * as fs from "fs";
import path from "path";

const userRoutes = express.Router()

userRoutes.post('/', passport.authenticate('signup', {session: false}),
    async (req, res) => {
        res.status(201).json({message: 'Signup successful', user: req.user});
    }
);

userRoutes.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user) => {
        try {
            if (err || !user) {
                const error = new Error('An error occurred');
                return next(error);
            }

            req.login(user, {session: false}, async (error) => {
                if (error) return next(error);

                const body = {_id: user._id, email: user.email}
                const token = jwt.sign({user: body}, JWT_PRIVATE_KEY);

                return res.json({message: 'Login successful', token});
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

export {userRoutes}

