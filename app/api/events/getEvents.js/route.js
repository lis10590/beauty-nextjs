import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Event from "@/app/_utils/schemas/Event";

export async function GET() {
  connectDB();
  const res = await Event.find({});

  return NextResponse.json(res);
}
