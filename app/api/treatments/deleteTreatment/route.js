import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Treatment from "@/app/_utils/schemas/Treatment";

export async function DELETE(req) {
  await connectDB();
  const res = await req.json();

  try {
    const treatment = Treatment.findByIdAndRemove(res.treatmentId);
    if (!treatment) {
      return NextResponse.json("treatment was not found", { status: 400 });
    }
    console.log("Removed Treatment : ", treatment);
    return NextResponse.json({ id: req.treatmentId }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "removing treatment failed", error },
      { status: 400 }
    );
  }
}
