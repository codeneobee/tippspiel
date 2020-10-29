import passport from "passport";
import {Users} from "./users/user.schema";

const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, (email: string, password: string, done: Function) => {
    Users.findOne({email})
        .then((user) => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, {
                    errors: {
                        'email or password': 'is invalid'
                    }
                });
            }

            return done(null, user);
        }).catch(done());
}));

export {passport}