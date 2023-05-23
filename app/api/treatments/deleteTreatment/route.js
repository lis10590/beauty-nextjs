import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Treatment from "@/app/_utils/schemas/Treatment";

export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const treatmentId = searchParams.get("treatmentId");

  try {
    const treatment = await Treatment.findByIdAndRemove(treatmentId);
    if (!treatment) {
      return NextResponse.json("treatment was not found", { status: 400 });
    }
    console.log("Removed Treatment : ", treatment);
    return NextResponse.json({ id: treatmentId }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "removing treatment failed", error },
      { status: 400 }
    );
  }
}
