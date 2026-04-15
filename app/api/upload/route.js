import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename =  file.name.replaceAll(" ", "_");
        const uniqueFilename = `${uuidv4()}-${filename}`;
        
        // Define path to save in public folder
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        
        // Create directory if it doesn't exist
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, uniqueFilename);
        await fs.writeFile(filePath, buffer);

        // Return the public URL
        const fileUrl = `/uploads/${uniqueFilename}`;

        return NextResponse.json({ success: true, url: fileUrl }, { status: 200 });
    } catch (error) {
        console.error('File upload error:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
