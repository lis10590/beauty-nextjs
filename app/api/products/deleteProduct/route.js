import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Product from "@/app/_utils/schemas/Product";

export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");
  try {
    const product = await Product.findByIdAndRemove(productId);
    if (!product) {
      return NextResponse.json("product was not found", {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }
    console.log("Removed Product : ", product);
    return NextResponse.json(
      { id: productId },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    return NextResponse.json("removing product failed", error, {
      status: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
}
