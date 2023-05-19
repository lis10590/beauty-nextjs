import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Treatment from "@/app/_utils/schemas/Treatment";

export async function DELETE(req) {
  await connectDB();

  try {
    const treatment = Treatment.findByIdAndRemove(req.treatmentId);
    if (!treatment) {
      NextResponse.json("treatment was not found", { status: 400 });
    }
    console.log("Removed Treatment : ", treatment);
    NextResponse.json({ id: req.treatmentId }, { status: 200 });
  } catch (error) {
    NextResponse.json(
      { message: "removing treatment failed", error },
      { status: 400 }
    );
  }
}
