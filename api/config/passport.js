const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
// const User = mongoose.model("users");
const UserServices = require('../services/UserServices');
const keys = require("../config/auth");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {

            const foundUser = await UserServices.getUser(jwt_payload.id);

            console.log(`INSIDE PASSPORT.JS - FOUND USER: ${foundUser}`);

            try {
                if (foundUser) {
                    return done(null, foundUser);
                }
                return done(null, false);
            } catch (error) {
                console.log(error);
            }
        })
    );
};
