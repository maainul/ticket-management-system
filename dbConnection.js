import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(`Trying to Connect Mongodb...........`.bgYellow);
    let MONGO_URL = "";
    if (process.env.DEV_MODE === "production") {
      MONGO_URL = process.env.MONGO_PRODUCTION_URL;
    } else {
      MONGO_URL = process.env.MONGO_LOCAL_URL;
    }
    const conn = await mongoose.connect(MONGO_URL);
    console.log(
      `Connected To Mongodb Database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(error);
    console.log(`Error in MongoDB ${error}`.bgRed.white);
  }
};

export default connectDB;
