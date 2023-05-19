import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Treatment from "@/app/_utils/schemas/Treatment";

export async function POST(req) {
  await connectDB();
  const treatment = req;

  const newTreatment = await new Treatment({
    treatmentName: treatment.treatmentName,
    price: treatment.price,
  });
  try {
    const existingTreatment = Treatment.find({
      treatmentName: treatment.treatmentName,
    });
    if (existingTreatment[0]) {
      NextResponse.json("Treatment exists", { status: 400 });
    }
    try {
      const savedTreatment = await newTreatment.save();
      NextResponse.json(savedTreatment, { status: 200 });
    } catch (err) {
      NextResponse.json(
        { message: "Saving treatment failed", err },
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