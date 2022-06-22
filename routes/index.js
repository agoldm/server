var express = require('express');
var router = express.Router();
var userController = require('../controllers/users');


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/register', async function (req, res, next) {
    res.json(await userController.register(req.body));
});

module.exports = router;
