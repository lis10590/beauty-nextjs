import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Product from "@/app/_utils/schemas/Product";

export async function POST() {
  await connectDB();
  const product = req;

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
      NextResponse.json("Product exists", { status: 400 });
    }
    try {
      const savedProduct = await newProduct.save();
      NextResponse.json(savedProduct);
    } catch (err) {
      NextResponse.json(
        { message: "Saving product failed", err },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    NextResponse.json(
      { message: "error in find function", error },
      { status: 400 }
    );
  }
}
