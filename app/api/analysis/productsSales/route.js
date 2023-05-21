import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Client from "@/app/_utils/schemas/Client";

export async function GET() {
  await connectDB();

  const pipeline = [
    // unwind the productsPurchased array to de-normalize data
    { $unwind: "$productsPurchased" },
    // lookup the Product collection to get the product details
    {
      $lookup: {
        from: "products",
        localField: "productsPurchased.productName",
        foreignField: "productName",
        as: "product",
      },
    },
    // unwind the product array to de-normalize data
    { $unwind: "$product" },
    // group by product and accumulate the count and revenue
    {
      $group: {
        _id: "$product.productName",
        count: { $sum: 1 },
        revenue: { $sum: "$product.price" },
      },
    },
    // project the output fields
    {
      $project: {
        _id: 0,
        productName: "$_id",
        count: 1,
        revenue: 1,
      },
    },
  ];

  try {
    const results = await Client.aggregate(pipeline);
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "getting products sales failed", error },
      { status: 400 }
    );
  }
}
