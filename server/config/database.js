import mongoose from "mongoose";
import config from "./index";

//mongoose.set("debug", true); // enabling debugging information to be printed to the console for debugging purposes
mongoose.Promise = Promise; // setting mongoose's Promise to use Node's Promise

// connect to MongoDB:
const connectMongo = () => {
  mongoose
    .connect(
      `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.name}`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    .then(() =>
      console.log(
        `MongoDB succesfully connected on: ${config.mongo.host}:${config.mongo.port}`
      )
    )
    .catch((err) => console.log(err));
};

export default connectMongo;
