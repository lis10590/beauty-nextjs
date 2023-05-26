import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Event from "@/app/_utils/schemas/Event";

export async function GET() {
  await connectDB();
  const res = await Event.find({});

  return NextResponse.json(res, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "private,no-cache, no-store, max-age=0, must-revalidate",
      "Access-Control-Allow-Headers": "*",
    },
  });
}
