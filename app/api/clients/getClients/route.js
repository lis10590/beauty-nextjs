import Customer from "@/app/_utils/schemas/Customer";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const currentPage = searchParams.get("page");

  const pageSize = 5;
  const skip = (currentPage - 1) * pageSize;
  const totalClients = await Customer.countDocuments({});
  const clients = await Customer.find({}).skip(skip).limit(pageSize);

  return NextResponse.json(
    { clients: clients, totalPages: Math.ceil(totalClients / pageSize) },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Headers": "*",
      },
    }
  );
}
