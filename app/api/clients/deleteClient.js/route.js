import Client from "@/app/_utils/schemas/Client";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  await connectDB();
  try {
    const client = await Client.findByIdAndRemove(req.clientId);
    if (!client) {
      NextResponse.json("client was not found", { status: 400 });
    }
    console.log("Removed Client : ", client);
    NextResponse.json({ id: req.clientId }, { status: 200 });
  } catch (error) {
    console.error(error);
    NextResponse.json(
      { message: "removing client failed", error },
      { status: 400 }
    );
  }
}
