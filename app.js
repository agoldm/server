var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const crypto = require('crypto');
const session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
const MongoStore = require('connect-mongo');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');
var app = express();

app.use(logger('dev'));
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     setTimeout(() => {
//         next()
//     }, 3000);
// })
app.use(
    session({
        store: MongoStore.create({ mongoUrl: 'mongodb+srv://shira:0528819696@cluster0.3ioem.mongodb.net/shugi?retryWrites=true&w=majority' }),
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

require('./passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.user);
    console.log(req.isAuthenticated());
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




// ///socket
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

module.exports = app;
