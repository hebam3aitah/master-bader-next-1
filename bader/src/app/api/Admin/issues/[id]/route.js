import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Issue from '@/models/Issue';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req, { params }) {
  await connectDB();
  try {
    const issue = await Issue.findById(params.id);
    if (!issue) return NextResponse.json({ message: 'البلاغ غير موجود' }, { status: 404 });
    return NextResponse.json(issue);
  } catch (err) {
    return NextResponse.json({ message: 'فشل في جلب البلاغ' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  try {
    const form = await req.formData();

    const Title = form.get('Title');
    const Description = form.get('Description');
    const Location = form.get('Location');
    const DangerLvl = form.get('DangerLvl');
    const existingImages = JSON.parse(form.get('Images') || '[]');
    const newImageFiles = form.getAll('newImages');

    const uploadedImages = [...existingImages];

    // رفع الصور الجديدة إلى Cloudinary
    for (const file of newImageFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'issues' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );

        Readable.from(buffer).pipe(stream);
      });

      const uploadedUrl = await uploadPromise;
      uploadedImages.push(uploadedUrl);
    }

    // تحديث البلاغ
    const updated = await Issue.findByIdAndUpdate(
      params.id,
      {
        Title,
        Description,
        Location,
        DangerLvl,
        Images: uploadedImages,
      },
      { new: true }
    );

    if (!updated) return NextResponse.json({ message: 'البلاغ غير موجود' }, { status: 404 });
    return NextResponse.json({ message: 'تم التحديث بنجاح', updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'فشل في تحديث البيانات' }, { status: 500 });
  }
}
