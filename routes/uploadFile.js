const multer = require('multer');
const { addCourse } = require('../controllers/courses');
var router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "public/images");
    },
    filename(req, file = {}, cb) {
        const { originalname } = file;
        const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
        cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);
    },
});
const upload = multer({ storage });

//add flower and upload flower image
router.post("/uploaded_file", upload.single('File'), async (req, res) => {
    res.json({ a: "1" })
    //req.body.image = 'images/' + req.file.filename;
    //res.json(await addCourse(req.body))
})
