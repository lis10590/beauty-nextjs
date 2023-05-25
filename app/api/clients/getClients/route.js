import Client from "@/app/_utils/schemas/Client";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const res = await Client.find({});

  return NextResponse.json(res, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Headers": "*",
    },
  });
}
