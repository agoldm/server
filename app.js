var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const crypto = require('crypto');
const session = require('express-session');
var passport = require('passport');
const MongoStore = require('connect-mongo');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');
var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     setTimeout(() => {
//         next()
//     }, 3000);
// })
app.use(session({
    secret: "avitalshira",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://shira:0528819696@cluster0.3ioem.mongodb.net/shugi?retryWrites=true&w=majority' }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

require('./passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.user);
    console.log(req.session);
    if (!req.session.randomSecret) {
        //להחליף אחרי הוספת קונטקסט בריאקט
        //req.session.randomSecret = crypto.randomBytes(64).toString('hex');;
        req.session.randomSecret = "ABC"
    }
    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);

module.exports = app;
