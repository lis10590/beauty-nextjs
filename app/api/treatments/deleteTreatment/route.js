import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import Treatment from "@/app/_utils/schemas/Treatment";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const treatmentId = searchParams.get("treatmentId");

  try {
    const treatment = await Treatment.findByIdAndRemove(treatmentId);
    if (!treatment) {
      return NextResponse.json("treatment was not found", {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store",
        },
      });
    }
    console.log("Removed Treatment : ", treatment);
    return NextResponse.json(
      { id: treatmentId },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "removing treatment failed", error },
      { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
