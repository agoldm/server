var express = require('express');
var courseController = require('../controllers/courses');
var router = express.Router();
const multer = require('multer');

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
router.post("/uploaded_file", upload.single('uploaded_file'), async (req, res) => {
    req.body.image = 'images/' + req.file.filename;
    res.json(await courseController.addCourse(req.body));
})

module.exports = router;