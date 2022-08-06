import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
  } catch (error) {
    throw error;
  }
};

export { connectMongo };
