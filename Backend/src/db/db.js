import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/opticalDB`
    );
    console.log(`\nMongoDB connected to ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Error in MongoDB Connection !!");
  }
};

export default connectDB;
