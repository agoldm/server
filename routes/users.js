var express = require('express');
var userController = require('../controllers/users');
var router = express.Router();
const { isAuthentication } = require("../middlewares/jwt")

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
router.get('/profile', async function (req, res) {
  res.json(await userController.getUserById(res.locals.userID));
});
router.post('/', async function (req, res, next) {
  res.json(await userController.addUser(req.body));
});
router.post('/favorite-course', async function (req, res, next) {
  console.log(res.locals.userID, req.body.courseId);
  res.json(await userController.addFavoriteCourse(res.locals.userID, req.body.courseId));
});
router.delete('/', async function (req, res, next) {
  res.json(await userController.deleteUser(req.body));
});
router.put('/', async function (req, res, next) {
  res.json(await userController.updateUser(res.locals.userID, req.body));
});
module.exports = router;
