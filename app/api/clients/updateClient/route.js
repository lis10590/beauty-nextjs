import Client from "@/app/_utils/schemas/Client";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function PUT(req) {
  await connectDB();
  const res = await req.json();

  const { phoneNumber, productName } = res;

  let result = await Client.findOneAndUpdate(
    { phoneNumber: phoneNumber },
    {
      $push: {
        productsPurchased: {
          productName: productName,
          date: new Date(),
        },
      },
    }
  );

  if (result) {
    console.log(result);
    return NextResponse.json(result, {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } else {
    return NextResponse.json("could not update purchased products", {
      status: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
}
