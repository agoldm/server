const jwt = require("jsonwebtoken");
const { userModel } = require("./db/models/userModel");

const isAuthentication = async (req, res, next) => {
    let token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ success: false, error: true, message: "you must send token" });
    }
    try {
        let verifyToken = jwt.verify(token, 'AVITALANDSHIRA');
        res.locals.userID = await verifyToken._id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, error: true, message: "error token" });
    }
}
exports.isAuthentication = isAuthentication;

const checkIfManager = async (req, res, next) => {
    if (res.locals.userType != 'm') {
        res.status(403).json({ success: false, error: true, message: "you have to be manager" });
    } else {
        next();
    }
}
exports.checkIfManager = checkIfManager;

const getUserType = async (id) => {
    try {
        let data = await userModel.findOne({ _id: id });
        return data.userType;
    } catch (error) {
        console.log(error);
        return "u";
    }
}