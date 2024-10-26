import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/app/(auth)/auth";

// Extend the existing File interface
declare global {
  interface File {
    size: number;
    type: string;
    readonly name: string;
  }
}

const FileSchema = z.object({
  file: z.instanceof(globalThis.File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should be less than 5MB",
    })
    .refine((file) => {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      return allowedTypes.includes(file.type);
    }, {
      message: "File type should be JPEG, PNG, or PDF",
    }),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Proceed with file upload logic
    const response = await put(file.name, file, { contentType: file.type, access: 'public' });
    return NextResponse.json({ url: response.url });
  } catch (error) {
    // Type assertion to specify that error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Handle unexpected error types
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}