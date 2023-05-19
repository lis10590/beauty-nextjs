import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Treatment from "@/app/_utils/schemas/Treatment";

export async function GET() {
  await connectDB();
  const res = await Treatment.find({});

  return NextResponse.json(res);
}
