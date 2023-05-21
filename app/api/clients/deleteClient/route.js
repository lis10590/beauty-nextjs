import Client from "@/app/_utils/schemas/Client";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId");

  try {
    const client = await Client.findByIdAndRemove(clientId);
    if (!client) {
      return NextResponse.json("client was not found", { status: 400 });
    }
    console.log("Removed Client : ", client);
    return NextResponse.json({ id: clientId }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "removing client failed", error },
      { status: 400 }
    );
  }
}
