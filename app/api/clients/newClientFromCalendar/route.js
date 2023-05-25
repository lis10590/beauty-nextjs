import Client from "@/app/_utils/schemas/Client";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const client = await req.json();

  const newClient = await new Client({
    fullName: client.fullName,
    phoneNumber: client.phoneNumber,
    treatmentHistory: [{ treatmentName: client.title, date: new Date() }],
  });

  try {
    const existingClient = await Client.find({
      phoneNumber: client.phoneNumber,
    });
    if (existingClient[0]) {
      let result = await Client.findOneAndUpdate(
        { phoneNumber: client.phoneNumber },
        {
          $push: {
            treatmentHistory: {
              treatmentName: client.title,
              date: new Date(),
            },
          },
        }
      );
      return NextResponse.json(result, {
        status: 200,
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
