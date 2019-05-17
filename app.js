const express = require("express");
const app = express();
const {options} = require("./encryption/core");
const server = require("https").Server(options, app);
const cookiesMiddleware = require('universal-cookie-express');

const {
    authority,
    creation,
    deletion,
    getInfo,
    publicSection,
    privateSection,
    registration,
    semiAccessibleSection,
    validation,
    vote
} = require("./app/controllers/app");

const {
    isAuthMiddleware,
    isNotAuthMiddleware
} = require("./app/controllers/middlewares/app");

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(cookiesMiddleware());

app.use(express.static("public"));
app.set("views", __dirname + "/app/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.post('/auth', authority);
app.post("/reg", registration);
app.post("/check/:type", validation);
app.post("/get/:type/info", getInfo);
app.post("/create/:type", creation);
app.post("/remove/:type", deletion);
app.get("/private/*", isAuthMiddleware, privateSection);
app.post("/vote/add", vote);
app.get("/vote/:id", isNotAuthMiddleware, semiAccessibleSection);
app.get(["*"], isNotAuthMiddleware, publicSection);

server.listen(2018);