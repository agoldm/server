var express = require('express');
var router = express.Router();
var userController = require('../controllers/users');
const passport = require('passport');
const cryptoJS = require('crypto-js');

router.post("/register", async (req, res) => {
    midPassword = cryptoJS.AES.decrypt(req.body.password, req.session.randomSecret);
    req.body.password = midPassword.toString(cryptoJS.enc.Utf8);
    let data = await userController.register(req.body);

    res.status(Number(data.status) || 200).json(data);
})

router.post("/login",
    (req, res, next) => {
        midPassword = cryptoJS.AES.decrypt(req.body.password, req.session.randomSecret);
        req.body.password = midPassword.toString(cryptoJS.enc.Utf8);
        next();
    },
    passport.authenticate('local'),
    async (req, res) => {
        res.json({
            login: true,
            type: req.user.role,
            username: req.user.username
        });
    }
);

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.json({ success: true, error: false })
    });  
});


module.exports = router;
