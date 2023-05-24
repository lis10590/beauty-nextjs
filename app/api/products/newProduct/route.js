import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Product from "@/app/_utils/schemas/Product";

export async function POST(req) {
  await connectDB();
  const product = await req.json();

  const newProduct = await new Product({
    productName: product.productName,
    manufacturer: product.manufacturer,
    productType: product.productType,
    productGroup: product.productGroup,
    price: product.price,
  });

  try {
    const existingProduct = await Product.find({
      productName: product.productName,
    });
    if (existingProduct[0]) {
      return NextResponse.json("Product exists", {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }
    try {
      const savedProduct = await newProduct.save();
      return NextResponse.json(savedProduct);
    } catch (err) {
      return NextResponse.json(
        { message: "Saving product failed", err },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "error in find function", error },
      { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
