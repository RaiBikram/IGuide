import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.BIKAM_MONGO_URI);
    console.log("Connected to Mongo DB!");
  } catch (error) {
    console.log(error.message);
    console.log(error)
    process.exit(1);
  }
};
