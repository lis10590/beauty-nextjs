import User from "@/app/_utils/schemas/User";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  const { email, password } = req;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    NextResponse.json(user, { status: 200 });
  } else {
    NextResponse.json({ message: "Wrong email or password!" }, { status: 400 });
  }
}
