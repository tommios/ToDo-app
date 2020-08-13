import express from "express";
import bodyParser from "body-parser";
import Routes from "./routes";
import config from "./config";
import connectMongo from "./config/database";

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// connect to MongoDB:
connectMongo();

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
