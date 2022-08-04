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

router.post('/update-user', isAuthentication, async function (req, res) {
  res.json(await userController.getUserById(req.body.userID));
});
router.get('/profile', isAuthentication, async function (req, res) {
  res.json(await userController.getUserById(res.locals.userID));
});
router.get('/favorite-course', isAuthentication, async function (req, res, next) {
  res.json(await userController.getUserFavorite(res.locals.userID));
});
router.post('/', isAuthentication, isAuthentication, async function (req, res, next) {
  res.json(await userController.addUser(req.body));
});
router.post('/favorite-course', isAuthentication, async function (req, res, next) {
  res.json(await userController.addFavoriteCourse(res.locals.userID, req.body.courseId));
});
router.delete('/favorite-course', isAuthentication, async function (req, res, next) {
  res.json(await userController.deleteFavoriteCourse(res.locals.userID, req.body.courseId));
});
router.delete('/', isAuthentication, async function (req, res, next) {
  res.json(await userController.deleteUser(req.body));
});
router.put('/', isAuthentication, async function (req, res, next) {
  res.json(await userController.updateUser(res.locals.userID, req.body));
});
module.exports = router;
