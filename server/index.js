import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import configPassport from "./config/passport"
import Routes from "./routes";
import config from "./config";
import connectMongo from "./config/database";

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors());

// connect to MongoDB:
connectMongo();

// // Passport middleware
app.use(passport.initialize({}));
// // Passport config
configPassport(passport);

// Routes
Routes(app);

// simple route to check server operation
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to ToDo application.",
  });
});

app.listen(config.app.port, () => {
  console.log(`Server listening on port: ${config.app.port}`);
  console.log("Environment:", config.app.environment);
});
