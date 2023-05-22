import Event from "@/app/_utils/schemas/Event";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");

  try {
    const event = await Event.findByIdAndRemove(eventId);
    if (!event) {
      return NextResponse.json("event was not found", { status: 400 });
    }
    console.log("Removed Event : ", event);
    return NextResponse.json({ id: eventId }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "removing event failed", error },
      { status: 400 }
    );
  }
}
