var express = require('express');
var courseController = require('../controllers/courses');
var router = express.Router();


router.get('/', async function (req, res, next) {
    res.json(await courseController.getAllCourses());
});
router.get('/my-courses', async function (req, res, next) {
    res.json(await courseController.getAllCourses({ status: true }));
});
router.get('/my-courses-history', async function (req, res, next) {
    res.json(await courseController.getAllCourses({ status: false }));
});
router.post('/', async function (req, res, next) {
    res.json(await courseController.addCourse(req.body));
});
router.delete('/:id', async function (req, res, next) {
    res.json(await courseController.deleteCourse(req.params.id));
});
router.put('/', async function (req, res, next) {
    res.json(await courseController.updateCourse(req.body));
});

module.exports = router;