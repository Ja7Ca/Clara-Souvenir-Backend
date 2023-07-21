const express = require("express");
const app = express();
// const flash = require('flash');
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cookieParser())
app.use(
    session({
        secret: "Ini rahasia banget",
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
    })
);

app.set("views", __dirname);

const passport = require("./lib/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static("public"));
app.use(cors());
dotenv.config();
const port = process.env.PORT || 5000;

const authRouter = require("./router/auth");
const pegawaiRouter = require("./router/pegawai");
const jobRouter = require("./router/job");
const barangRouter = require("./router/barang");

app.use(authRouter);
app.use(pegawaiRouter);
app.use(jobRouter);
app.use(barangRouter);

app.listen(port, () => {
    console.log("Server is running on port 5000");
});

module.exports = app;
