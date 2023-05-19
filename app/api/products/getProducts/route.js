import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Product from "@/app/_utils/schemas/Product";

export async function GET() {
  await connectDB();
  const res = await Product.find({});

  return NextResponse.json(res);
}
