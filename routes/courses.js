var express = require('express');
var courseController = require('../controllers/courses');
var router = express.Router();


router.get('/', async function (req, res, next) {
    res.json(await courseController.getAllCourses());
});
router.get('/my-courses', async function (req, res, next) {
    res.json(await courseController.getAllCourses());
});
router.post('/', async function (req, res, next) {
    res.json(await courseController.addCourse(req.body));
});
router.delete('/', async function (req, res, next) {
    res.json(await courseController.deleteCourse(req.body));
});
router.put('/', async function (req, res, next) {
    res.json(await courseController.updateCourse(req.body));
});

module.exports = router;