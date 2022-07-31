var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const crypto = require('crypto');
const session = require('express-session');
var flash = require('connect-flash');
const MongoStore = require('connect-mongo');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');
var app = express();
const { isAuthentication } = require("./middlewares/jwt")
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


app.use(session({
    secret: "avitalshira",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://shira:0528819696@cluster0.3ioem.mongodb.net/shugi?retryWrites=true&w=majority' }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));


// app.use(passport.initialize());
// app.use(passport.session());

app.use((req, res, next) => {
    if (!req.session.randomSecret) {
        //להחליף אחרי הוספת קונטקסט בריאקט
        //req.session.randomSecret = crypto.randomBytes(64).toString('hex');;
        req.session.randomSecret = "ABC"
    }
    next();
})

app.use('/', indexRouter);
app.use('/users', isAuthentication, usersRouter);
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
