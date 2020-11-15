import passport from "passport";
import {Users} from "./users/user.schema";
import LocalStrategy from 'passport-local';
import JWT from 'passport-jwt';
import {JWT_PRIVATE_KEY} from "./users/users.routes";

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
            return done(null, false, {message: 'Email is incorrect'})
        }

        const validate = await user.isValidPassword(password);
        if (!validate) {
            return done(null, false, {message: 'Password is incorrect'})
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
