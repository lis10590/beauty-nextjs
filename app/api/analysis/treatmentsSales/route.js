import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Client from "@/app/_utils/schemas/Client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function GET() {
  await connectDB();

  const pipeline = [
    // unwind the productsPurchased array to de-normalize data
    { $unwind: "$treatmentHistory" },
    // lookup the Product collection to get the product details
    {
      $lookup: {
        from: "treatments",
        localField: "treatmentHistory.treatmentName",
        foreignField: "treatmentName",
        as: "treatment",
      },
    },
    // unwind the product array to de-normalize data
    { $unwind: "$treatment" },
    // group by product and accumulate the count and revenue
    {
      $group: {
        _id: "$treatment.treatmentName",
        count: { $sum: 1 },
        revenue: { $sum: "$treatment.price" },
      },
    },
    // project the output fields
    {
      $project: {
        _id: 0,
        treatmentName: "$_id",
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
      { message: "getting treatments sales failed", error },
      { status: 400 }
    );
  }
}
