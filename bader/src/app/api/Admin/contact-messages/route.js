import { NextResponse } from "next/server";
import ContactMessage from "@/models/ContactMessage";
import { connectDB } from "@/lib/mongoose";
import { sendReplyEmail } from "@/lib/email";

export async function GET() {
  try {
    await connectDB();
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const newMessage = new ContactMessage(body);
    await newMessage.save();
    return NextResponse.json({ success: true, message: "Message saved!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { replied, replyText } = await req.json();

    const message = await ContactMessage.findById(params.id);
    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    // تحديث الحالة
    message.replied = replied ?? true;
    await message.save();

    // إذا كان هناك رد نصي، أرسل الإيميل
    if (replyText) {
      await sendReplyEmail({
        to: message.email,
        subject: 'رد على رسالتك',
        html: `<p>مرحبًا ${message.name}،</p><p>${replyText}</p><p>مع تحياتنا، فريق العيادة.</p>`,
      });
    }

    return NextResponse.json({ success: true, message: 'Updated and replied if provided.' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}