import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Product from "@/app/_utils/schemas/Product";

export async function DELETE() {
  connectDB();
  try {
    const product = await Product.findByIdAndRemove(req.body.productId);
    if (!product) {
      NextResponse.json("product was not found", { status: 400 });
    }
    console.log("Removed Product : ", product);
    NextResponse.json({ id: req.productId }, { status: 200 });
  } catch (error) {
    NextResponse.json("removing product failed", error, { status: 400 });
  }
}
