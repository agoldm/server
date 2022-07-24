const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { userModel } = require("./db/models/userModel")

const customFields = {
    usernameField: 'username',
    passwordField: 'password'
};

const verifyCallback = (username, password, done) => {
    userModel.findOne({ username, password })
        .then((user) => {
            if (!user) { return done(null, false) }
            return done(null, user);
        })
        .catch((err) => {
            done(err);
        });
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    userModel.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});