import Client from "@/app/_utils/schemas/Client";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId");

  try {
    const client = await Client.findById(clientId);

    return NextResponse.json(client, {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "getting clients failed", error },
      { status: 400 }
    );
  }
}
