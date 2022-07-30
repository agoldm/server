const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { userModel } = require("./db/models/userModel")

// const customFields = ;

// const verifyCallback = (username, password, done) => {
//     userModel.findOne({ username, password })
//         .then((user) => {
//             if (!user) { return done(null, false) }
//             return done(null, user);
//         })
//         .catch((err) => {
//             done(err);
//         });
// }

// const strategy = new LocalStrategy(verifyCallback);

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    userModel.findOne({ username, password })
        .then((user) => {
            if (!user) { return done(null, false) }
            user = { _id: user._id, username: user.username };
            // console.log(user);
            return done(null, user);
        })
        .catch((err) => {
            done(err);
        });
}
));


passport.serializeUser((user, done) => {
    // console.log('Serialized user');
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // console.log("Deserializing user...");
    done(null, user);
});