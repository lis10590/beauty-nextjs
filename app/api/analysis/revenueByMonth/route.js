import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Client from "@/app/_utils/schemas/Client";

export async function GET() {
  await connectDB();

  const pipeline = [
    {
      $unwind: "$productsPurchased",
    },
    {
      $lookup: {
        from: "products",
        localField: "productsPurchased.productName",
        foreignField: "productName",
        as: "productInfo",
      },
    },
    {
      $unwind: "$productInfo",
    },
    {
      $group: {
        _id: {
          year: { $year: "$productsPurchased.date" },
          month: { $month: "$productsPurchased.date" },
        },
        revenue: { $sum: "$productInfo.price" },
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        revenue: 1,
      },
    },
  ];

  try {
    const revenueByMonth = await Client.aggregate(pipeline);
    return NextResponse.json(revenueByMonth, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "getting revenue by month failed", error },
      { status: 400 }
    );
  }
}
