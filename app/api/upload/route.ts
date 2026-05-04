import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename to prevent collisions
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Path: public/uploads/filename
    const path = join(process.cwd(), "public", "uploads", fileName);
    
    await writeFile(path, buffer);
    
    const url = `/uploads/${fileName}`;
    console.log(`✅ [UPLOAD_SUCCESS]: File saved to ${url}`);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("❌ [UPLOAD_ERROR]:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
