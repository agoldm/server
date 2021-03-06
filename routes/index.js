var express = require('express');
var router = express.Router();
var userController = require('../controllers/users');
const passport = require('passport');
const cryptoJS = require('crypto-js');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.post('/register', async function (req, res, next) {
//     console.log(req.body);
//     res.json(await userController.register(req.body));
// });

router.post("/register", async (req, res) => {

    midPassword = cryptoJS.AES.decrypt(req.body.password, req.session.randomSecret);
    req.body.password = midPassword.toString(cryptoJS.enc.Utf8);

    res.json(await userController.register(req.body));

})
router.post("/login",
    (req, res, next) => {
        midPassword = cryptoJS.AES.decrypt(req.body.password, req.session.randomSecret);
        req.body.password = midPassword.toString(cryptoJS.enc.Utf8);
        next();
    },
    passport.authenticate('local', {
        failureRedirect: '/login/error',
        successRedirect: '/login/success'
    }));
router.get('/login/error', function (req, res) {
    res.json({ login: false });
});
router.get('/login/success', function (req, res) {
    console.log(req.user);
    res.json({login:true})
    // res.json({
    //     login: true,
    //     type: req.user.role,
    //     username: req.user.username
    // });
});


router.get('/logout', (req, res, next) => {
    req.logout();
    res.json({ success: true, error: false })
});


module.exports = router;
