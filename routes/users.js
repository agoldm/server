var express = require('express');
var userController = require('../controllers/users');
var router = express.Router();


/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.json(await userController.getAllUsers());
});
router.get('/teachers', async function (req, res, next) {
  res.json(await userController.getAllUsers({ role: "teacher" }));
});
router.get('/students', async function (req, res, next) {
  res.json(await userController.getAllUsers({ role: "student" }));
});
router.post('/', async function (req, res, next) {
  res.json(await userController.addUser(req.body));
});
router.delete('/', async function (req, res, next) {
  res.json(await userController.deleteUser(req.body));
});
router.put('/', async function (req, res, next) {
  res.json(await userController.updateUser(req.body));
});
module.exports = router;
