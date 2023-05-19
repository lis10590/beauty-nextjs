import User from "@/app/_utils/schemas/User";
import connectDB from "@/app/_utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { firstName, lastName, email, password } = req;
  if (!firstName || !lastName || !email || !password) {
    NextResponse.json(
      { message: "Please fill in all the fields" },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  //Hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Create user

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (user) {
    NextResponse.json(
      {
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      { status: 200 }
    );
  } else {
    NextResponse.json({ message: "Invalid user data" }, { status: 400 });
  }
}