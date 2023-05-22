const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morganLogger = require("morgan");
const logSymbols = require("log-symbols");

require("dotenv").config();
require("./helpers/logger");
require("./helpers/RESPONSE");
require("./helpers/MAIL");

const indexRouter = require("./routes/index");

const NetLogger = require("./helpers/networkLogger").NetLogger;

const app = express();

app.use(
  morganLogger(":method :url :status :remote-addr", {
    stream: NetLogger.stream,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(morganLogger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

logger.info("[", logSymbols.success, "] server started");

module.exports = app;
