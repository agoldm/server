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


module.exports = router;
