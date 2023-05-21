import User from "@/app/_utils/schemas/User";
import connectDB from "@/app/_utils/db";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const res = await req.json();
  const { email, password } = res;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return NextResponse.json(user, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "Wrong email or password!" },
      { status: 400 }
    );
  }
}
