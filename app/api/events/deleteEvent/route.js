import Event from "@/app/_utils/schemas/Event";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  connectDB();
  try {
    const event = Event.findByIdAndRemove(req.eventId);
    if (!event) {
      NextResponse.json("event was not found", { status: 400 });
    }
    console.log("Removed Event : ", event);
    NextResponse.json({ id: req.eventId });
  } catch (error) {
    NextResponse.json(
      { message: "removing event failed", error },
      { status: 400 }
    );
  }
}
