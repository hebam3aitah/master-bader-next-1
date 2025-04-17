import { NextResponse } from "next/server";
import mongoose from "mongoose";
import ContactMessage from "@/models/ContactMessage";
import { connectDB} from "@/lib/connectDb";  

export async function POST(request) {
  const body = await request.json();

  // connect to MongoDB
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  try {
    const newMessage = new ContactMessage(body);
    await newMessage.save();
    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
