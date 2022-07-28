module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ success: false, msg: 'You are not authorized to view this resource' });
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.category == 'manager') {
        next();
    } else {
        res.status(401).json({ success: false, msg: 'You are not authorized to view this resource because you are not an admin.' });
    }
}


const checkAuthenticated = (req, res, next) => {
    console.log("checkAuthenticated");
    if (req.isAuthenticated()) { return next() }
    res.redirect("/login")
}

const checkLoggedIn = (req, res, next) => {
    console.log("checkLoggedIn");
    if (req.isAuthenticated()) {
        return res.redirect("/Dashboard")
    }
    next()
}

module.exports = {
    checkAuthenticated: checkAuthenticated,
    checkLoggedIn: checkLoggedIn
};
