//middlewheres
const { userModel } = require("../db/models/userModel")

module.exports = (req, res, next) => {

    let username = req.query.user;
    let user = userModel.findOne({username});
    if (user) return next();
    res.status(401).json({ success: false });

}