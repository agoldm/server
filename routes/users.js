var express = require('express');
var userController = require('../controllers/users');
var router = express.Router();


/* GET users listing. */
router.get('/',async function(req, res, next) {
  res.json(await userController.getAllUsers());
});

router.get('/teachers',async function(req, res, next) {
  res.json(await userController.getAllUsers({role:"teacher"}));
});

router.post('/',async function(req, res, next) {
  res.json(await userController.addUser(req.body));
});

module.exports = router;
