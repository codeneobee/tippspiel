import passport from "passport";
import {Users} from "./users/user.schema";
import LocalStrategy from 'passport-local';
import JWT from 'passport-jwt';
import fs from "fs";
import path from "path";

export const JWT_PRIVATE_KEY = process.env.NODE_ENV === 'test' ? 'TOP_SECRET' : fs.readFileSync(path.join(__dirname, '../../jwt_private_key.txt'), 'utf-8');

passport.use('signup', new LocalStrategy.Strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = await Users.create({email, password});
            return done(null, user)
        } catch (error) {
            done(error);
        }
    }));

passport.use('login', new LocalStrategy.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await Users.findOne({email});

        if (!user) {
            return done(new Error('Email is incorrect'), false)
        }

        const validate = await user.isValidPassword(password);
        if (!validate) {
            return done(new Error('Password is incorrect'), false)
        }
        return done(null, user, {message: 'Login successful'});
    } catch (error) {
        return done(error);
    }
}));

passport.use('jwt', new JWT.Strategy({
        secretOrKey: JWT_PRIVATE_KEY,
        jwtFromRequest: JWT.ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
        try {
            return done(null, token.user)
        } catch (error) {
            done(error);
        }
    }))
export {passport}
