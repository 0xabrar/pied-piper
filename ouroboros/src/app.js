import express from "express";
import logger from "./logger";
import tridentRoutes from "./endpoints/trident";
import populousRoutes from "./endpoints/populous";
import javelinRoutes from "./endpoints/javelin";
//import authenticationRoutes from "./endpoints/authentication";
import { SERVICE_NAMES, SERVICE_PORTS, MONGO_CONFIG } from "../common/config";

var jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const Faculty = require("./endpoints/faculty");

const app = express();
app.disable("x-powered-by");
logger.info("Starting Ouroboros");
app.use(express.json());

mongoose.connect(MONGO_CONFIG.HOST);

mongoose.connection.on("connected", () => {
  logger.info(`Mongoose default connection open to ${MONGO_CONFIG.HOST}`);
});

// If the connection throws an error
mongoose.connection.on("error", err => {
  logger.error(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  logger.info("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    logger.info(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

// Routes
app.use("/gapf", tridentRoutes);
app.use("/tickets", javelinRoutes);
app.use("/users", populousRoutes);
app.set("secret-key", "grpc");

app.post("/authenticate", (req, res) => {
  logger.info("Entered authenticate post: %j", req.body);
  // find the user
  Faculty.findOne(
    {
      email: req.body.email
    },
    (err, user) => {
      if (err) {
        logger.error("Faculty.findOne error %j", err);
      }

      if (!user) {
        logger.error("User null %j", user);
        res.json({
          success: false,
          message: "Authentication failed. User not found"
        });
      } else if (user) {
        logger.error("User password !=== req.body.password %j", user);
        // check if password matches
        if (user.password !== req.body.password) {
          res.json({
            success: false,
            message: "Authentication failed. Wrong password."
          });
        } else {
          logger.info("else branch");
          // if user is found and password is right
          // create a token with only our given payloyad
          const payload = {
            type: user.type,
            email: user.email,
            department: user.department,
            facultyId: user.facultyId
          };
          const token = jwt.sign(payload, app.get("secret-key"), {
            expiresIn: 1440 // expires in 24 hours
          });
          logger.info("token done %j", token);

          // return the information including token as JSON
          res.cookie("auth", token);
          res.json({
            success: true,
            message: "Enjoy your token!",
            token
          });
          res.status(200);
        }
      }
    }
  );
});

app.post("/logout", (req, res) => {
  res.clearCookie("auth");
});

app.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  var token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookie.auth;
  if (token) {
    //Decode the token
    jwt.verify(token, "grpc", (err, decod) => {
      if (err) {
        res.status(403).json({
          message: "Wrong Token"
        });
      } else {
        //If decoded then call next() so that respective route is called.
        req.decoded = decod;
        logger.info("req.decoded: %j", req.decoded);
        next();
      }
    });
  } else {
    res.status(403).json({
      message: "No Token"
    });
  }
});

// Catch 404 and return 'Not found' message
app.use((req, res) => {
  res.status(404);

  // respond with json
  if (req.accepts("json")) {
    res.send({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

const { PORT = SERVICE_PORTS[SERVICE_NAMES.OUROBOROS] } = process.env;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // eslint-disable-line no-console
