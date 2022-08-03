const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
// const passport = require('passport');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post("/register", async (req, res) => {

    midPassword = cryptoJS.AES.decrypt(req.body.password, req.session.randomSecret);
    req.body.password = midPassword.toString(cryptoJS.enc.Utf8);

    req.body.password = await bcrypt.hash(req.body.password, 10);

    let data = await userController.register(req.body);

    res.status(Number(data.status) || 200).json(data);
})

router.post("/login",
    (req, res, next) => {
        midPassword = cryptoJS.AES.decrypt(req.body.password, req.session.randomSecret);
        req.body.password = midPassword.toString(cryptoJS.enc.Utf8);


        next();
    },
    async (req, res) => {
        try {

            let user = await userController.login(req.body.username, req.body.password);
            if (user.error) return res.status(401).json({ error: true });

            let token = await jwt.sign({ _id: user._id, name: user.name, role: user.role }, "AVITALANDSHIRA", { expiresIn: "1h" });
            let role = user.role;
            res.json({ token, role });
        } catch (error) {
            res.status(401).json({ error: true });
        }
    }
);

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.json({ success: true, error: false })
    });
});
var nodemailer = require('nodemailer');
var generate = require('generate-password')
//smtp
router.post("/reset-password", async function (req, res, next) {
    let data = await userController.getUserMail(req.body.user);
    if (data.success) {

        var newPassword = generate.generate({
            length: 8,
            numbers: true,
            symbols: false,
            lowercase: false,
            uppercase: false,
            strict: true,
        });


        // create transporter object with smtp server details
        var transporter = nodemailer.createTransport({
            service: 'Walla',
            // port: 2525,
            auth: {
                user: 'shugipro@walla.co.il',
                pass: 'mother2022'
            },
            secure: false,
        });

        console.log(2);
        var mailOptions = {
            from: 'shugipro@walla.co.il',
            // to: req.user.mail,
            to: `${data.email}`,
            subject: 'Reset Password',
            text: `סיסמתך החדשה היא:
            ${newPassword}`
        };

        await userController.changePassword(req.body.user, newPassword);
        res.json({ success: true, error: false, newPassword: newPassword })
        // send email
        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //         res.json({ success: false, error: true })
        //     } else {
        //         res.json({ success: true, error: false })
        //     }
        // });
    }
});


module.exports = router;
