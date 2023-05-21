import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Product from "@/app/_utils/schemas/Product";

export async function DELETE(req) {
  await connectDB();
  const res = await req.json();
  try {
    const product = await Product.findByIdAndRemove(res.productId);
    if (!product) {
      return NextResponse.json("product was not found", { status: 400 });
    }
    console.log("Removed Product : ", product);
    return NextResponse.json({ id: req.productId }, { status: 200 });
  } catch (error) {
    return NextResponse.json("removing product failed", error, { status: 400 });
  }
}
