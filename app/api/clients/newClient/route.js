import Client from "@/app/_utils/schemas/Client";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  connectDB();
  console.log(req);
  const client = req;

  const newClient = await new Client({
    fullName: client.fullName,
    phoneNumber: client.phoneNumber,
  });

  try {
    const existingClient = await Client.find({
      phoneNumber: client.phoneNumber,
    });
    if (existingClient[0]) {
      NextResponse.json("Client exists", { status: 400 });
    }
    try {
      const savedClient = await newClient.save();
      NextResponse.json(savedClient, { status: 200 });
    } catch (err) {
      NextResponse.json(err, "Saving client failed", { status: 400 });
    }
  } catch (error) {
    console.error(error);
    NextResponse.json(error, "getting clients failed", { status: 400 });
  }
}
