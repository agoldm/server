var express = require('express');
var courseController = require('../controllers/courses');
var router = express.Router();
const multer = require('multer');

const { isAuthentication } = require("../middlewares/jwt")

router.get('/', async function (req, res, next) {
    res.json(await courseController.getAllCourses());
});
router.get('/my-courses', isAuthentication, async function (req, res, next) {
    res.json(await courseController.getMyCourses(res.locals.userID));
});
router.get('/my-students',isAuthentication, async function (req, res, next) {
    res.json(await courseController.getMyStudents(res.locals.userID));
});
router.get('/student-courses', isAuthentication, async function (req, res, next) {
    res.json(await courseController.getStudentCourses(res.locals.userID));
});
router.get('/getMyTeachers', async function (req, res, next) {
    res.json(await courseController.getMyTeachers(req.body.id));
});
router.post('/signCourse', isAuthentication, async function (req, res, next) {
    res.json(await courseController.signCourse(req.body.courseId, res.locals.userID));
});
//not done yet
router.get('/my-courses-history', isAuthentication, async function (req, res, next) {
    res.json(await courseController.getAllCourses({ status: false }));
});
router.post('/', isAuthentication, async function (req, res, next) {
    res.json(await courseController.addCourse({ teacher_id: res.locals.userID, ...req.body }));
});
router.delete('/:id', isAuthentication, async function (req, res, next) {
    res.json(await courseController.deleteCourse(req.params.id));
});
router.put('/', isAuthentication, async function (req, res, next) {
    res.json(await courseController.updateCourse(req.body));
});



const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "public/images");
    },
    filename(req, file = {}, cb) {
        const { originalname } = file;
        //const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
        cb(null, originalname);
    },
});
const upload = multer({ storage });

//add flower and upload flower image
router.post("/", async (req, res) => {
    res.json(await courseController.addCourse(req.body))
})
router.post("/uploaded_file", upload.single('File'), async (req, res) => {
    if (req.file) {
        return res.json({ success: true, imagePath: 'images/' + req.file.filename })
    } else {
        return res.status(500).json({ error: true })
    }
})

module.exports = router;