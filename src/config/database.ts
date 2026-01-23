import mongoose from 'mongoose';
import { config } from './config'
import { logger } from './logger';



export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = config.MONGO_URL ;
    
    await mongoose.connect(mongoUri);
    
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

export const closeDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error);
  }
};
