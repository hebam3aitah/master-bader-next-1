import { NextResponse } from "next/server";
import ContactMessage from "@/models/ContactMessage";
import { connectDB } from "@/lib/mongoose";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const updated = await ContactMessage.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectDB();
    await ContactMessage.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Message deleted." });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
