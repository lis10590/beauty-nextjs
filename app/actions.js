"use server";

import { signIn } from "@/auth";
import Customer from "./_utils/schemas/Customer";
import connectDB from "./_utils/db";
import { auth } from "@/auth";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export const loginUser = async (formData) => {
  await signIn("credentials", {
    /* redirect: true,
      redirectTo: "/home",*/
    email: formData.get("email"),
    password: formData.get("password"),
  });
};

export const getCustomers = async (currentPage) => {
  try {
    await connectDB();
    const session = await auth();

    const userId = new mongoose.Types.ObjectId(session.user.id);
    console.log(userId);

    const pageSize = 5;
    const skip = (currentPage - 1) * pageSize;
    const totalClients = await Customer.countDocuments({
      userId,
    });
    const clients = await Customer.find({ userId }).skip(skip).limit(pageSize);

    const totalPages = Math.ceil(totalClients / pageSize);
    return { clients, totalPages };
  } catch (error) {
    console.log(error);
  }
};

export const addCustomer = async (customer) => {
  await connectDB();
  const session = await auth();

  const newClient = await new Customer({
    fullName: customer.get("fullName"),
    phoneNumber: customer.get("phoneNumber"),
    userId: new mongoose.Types.ObjectId(session.user.id),
  });

  console.log(newClient);

  try {
    const existingClient = await Customer.find({
      phoneNumber: customer.get("phoneNumber"),
    });
    if (existingClient[0]) {
      throw new Error("customer exists");
    }
    try {
      await newClient.save();
      revalidatePath("/clients");
    } catch (err) {
      console.log(err);
      throw new Error("Saving customer failed");
    }
  } catch (error) {
    console.error(error);
    throw new Error("getting customers failed");
  }
};
