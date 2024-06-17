import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Product from "@/app/_utils/schemas/Product";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const currentPage = searchParams.get("page");

  const pageSize = 5;
  const skip = (currentPage - 1) * pageSize;
  const totalProducts = await Product.countDocuments({});
  const products = await Product.find({}).skip(skip).limit(pageSize);

  return NextResponse.json(
    { products: products, totalPages: Math.ceil(totalProducts / pageSize) },
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
