import Client from "@/app/_utils/schemas/Client";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  connectDB();
  const res = await Client.find({});

  return NextResponse.json(res);
}
