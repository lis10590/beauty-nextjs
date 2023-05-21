import Client from "@/app/_utils/schemas/Client";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";

export async function PUT(req) {
  await connectDB();

  const { phoneNumber, productName } = req;

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
    return NextResponse.json(result, { status: 200 });
  } else {
    return NextResponse.json("could not update purchased products", {
      status: 400,
    });
  }
}
