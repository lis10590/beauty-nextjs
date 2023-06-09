import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Treatment from "@/app/_utils/schemas/Treatment";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function POST(req) {
  await connectDB();
  const treatment = await req.json();

  const newTreatment = await new Treatment({
    treatmentName: treatment.treatmentName,
    price: treatment.price,
  });
  try {
    const existingTreatment = Treatment.find({
      treatmentName: treatment.treatmentName,
    });
    if (existingTreatment[0]) {
      return NextResponse.json("Treatment exists", {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }
    try {
      const savedTreatment = await newTreatment.save();
      return NextResponse.json(savedTreatment, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store",
        },
      });
    } catch (err) {
      return NextResponse.json(
        { message: "Saving treatment failed", err },
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
