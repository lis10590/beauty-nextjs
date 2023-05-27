import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Treatment from "@/app/_utils/schemas/Treatment";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function GET() {
  await connectDB();
  const res = await Treatment.find({});

  return NextResponse.json(res, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Headers": "*",
    },
  });
}
