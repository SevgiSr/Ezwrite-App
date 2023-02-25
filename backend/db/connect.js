import mongoose from "mongoose";

mongoose.set("strictQuery", true);
//mongoose connect method returns a promise. therefore
//your server will set up async await
const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDB;
