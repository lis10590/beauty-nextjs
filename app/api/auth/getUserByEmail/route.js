import User from "@/app/_utils/schemas/User";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const user = await User.findOne({ email });
  if (user) {
    return NextResponse.json(user, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "Wrong email or password!" },
      { status: 400 }
    );
  }
}
