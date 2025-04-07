import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('✅ Mongoose connected!');
  } catch (err) {
    console.error('❌ Mongoose connection failed:', err);
    throw err;
  }
}
