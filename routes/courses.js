var express = require('express');
var courseController = require('../controllers/courses');
var router = express.Router();
const multer = require('multer');

const {isAuthentication} = require("../jwt")

router.get('/', async function (req, res, next) {
    res.json(await courseController.getAllCourses());
});
router.get('/my-courses', isAuthentication, async function (req, res, next) {
    console.log(res.locals.userID);
    res.json(await courseController.getAllCourses(res.locals.userID));
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
router.post("/", async (req, res) => {
   res.json(await courseController.addCourse(req.body))
})
router.post("/uploaded_file", upload.single('File'), async (req, res) => {
    console.log(req.body);
    if (req.file) {
        return res.json({ success: true, imagePath: 'images/' + req.file.filename })
    } else {
        return res.status(500).json({ error: true })
    }
})

module.exports = router;