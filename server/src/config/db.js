import mongoose from 'mongoose';
import config from './env.js';

export const connectDB = async () => {
  try {
    const uri = config.mongoUri;
    if (!uri) {
      throw new Error("MONGO_URI is missing in environment variables.");
    }
    
    await mongoose.connect(uri);
    console.log('📦 MongoDB Connected successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};
