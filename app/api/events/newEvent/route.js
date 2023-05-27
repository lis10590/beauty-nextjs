import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Event from "@/app/_utils/schemas/Event";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function POST(req) {
  await connectDB();

  const event = await req.json();

  const newEvent = await new Event({
    title: event.title,
    start: event.start,
    end: event.end,
    clientName: event.fullName,
    phoneNumber: event.phoneNumber,
  });

  try {
    const savedEvent = await newEvent.save();
    return NextResponse.json(savedEvent, {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Saving event failed", error },
      { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
