import Client from "@/app/_utils/schemas/Client";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const client = await req.json();

  const newClient = await new Client({
    fullName: client.fullName,
    phoneNumber: client.phoneNumber,
  });

  try {
    const existingClient = await Client.find({
      phoneNumber: client.phoneNumber,
    });
    if (existingClient[0]) {
      return NextResponse.json("Client exists", {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store",
        },
      });
    }
    try {
      const savedClient = await newClient.save();
      return NextResponse.json(savedClient, {
        status: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    } catch (err) {
      return NextResponse.json(
        { err, message: "Saving client failed" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error, message: "getting clients failed" },
      { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
