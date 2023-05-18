import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Event from "@/app/_utils/schemas/Event";

export async function POST(req) {
  connectDB();

  const event = req;

  const newEvent = await new Event({
    title: event.title,
    start: event.start,
    end: event.end,
    clientName: event.fullName,
    phoneNumber: event.phoneNumber,
  });

  try {
    const savedEvent = await newEvent.save();
    NextResponse.json(savedEvent, { status: 200 });
  } catch (error) {
    NextResponse.json("Saving event failed", error, { status: 400 });
  }
}
