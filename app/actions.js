"use server";

import { signIn } from "@/auth";
import Customer from "./_utils/schemas/Customer";
import UserCustomer from "./_utils/schemas/UserCustomer";
import Product from "./_utils/schemas/Product";
import UserProduct from "./_utils/schemas/UserProduct";
import Treatment from "./_utils/schemas/Treatment";
import UserTreatment from "./_utils/schemas/UserTreatment";
import Event from "./_utils/schemas/Event";
import Purchase from "./_utils/schemas/Purchase";
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

//gets customers by userId and joins the customers table
export const getCustomers = async (currentPage) => {
  try {
    await connectDB();
    const session = await auth();

    const userId = new mongoose.Types.ObjectId(session.user.id);

    const pageSize = 5;
    const skip = (currentPage - 1) * pageSize;
    const totalClients = await UserCustomer.countDocuments({
      userId,
    });
    const customers = await UserCustomer.find({ userId })
      .skip(skip)
      .limit(pageSize)
      .populate("customerId");

    const totalPages = Math.ceil(totalClients / pageSize);
    return { customers, totalPages };
  } catch (error) {
    console.log(error);
  }
};

//get customer by id (of a loggen user)

export const getCustomerById = async (customerId) => {
  try {
    await connectDB();
    const session = await auth();

    const userId = new mongoose.Types.ObjectId(session.user.id);

    const customer = await UserCustomer.find({ userId, customerId }).populate(
      "customerId"
    );

    return customer;
  } catch (error) {
    console.log(error);
  }
};

//adds a new customer to a user (and adds the connection on UserCustomer table)
export const addCustomer = async (customer) => {
  await connectDB();
  const session = await auth();

  try {
    const newCustomer = await new Customer({
      fullName: customer.get("fullName"),
      phoneNumber: customer.get("phoneNumber"),
    });

    console.log(newCustomer);

    const existingCustomer = await Customer.find({
      phoneNumber: customer.get("phoneNumber"),
    });
    if (existingCustomer[0]) {
      throw new Error("customer exists");
    }

    await newCustomer.save();

    const newConnection = await new UserCustomer({
      userId: new mongoose.Types.ObjectId(session.user.id),
      customerId: newCustomer._id,
    });

    await newConnection.save();
    revalidatePath("/clients");
  } catch (error) {
    console.log(error);
    throw new Error("Saving customer failed");
  }
};
//delete a customer by its id
export const deleteCustomer = async (customerId) => {
  await connectDB();
  const session = await auth();

  try {
    const customer = await Customer.findByIdAndDelete(customerId);
    if (!customer) {
      throw new Error("customer doesnt exist");
    }

    const connection = await UserCustomer.deleteOne({
      customerId,
      userId: new mongoose.Types.ObjectId(session.user.id),
    });

    if (!connection) {
      throw new Error("connection doesnt exist");
    }

    revalidatePath("/clients");
  } catch (error) {
    console.error(error);
    throw new Error("deleting customer failed");
  }
};

export const updateCustomer = async (phoneNumber) => {
  await connectDB();
  try {
    const update = await Customer.findOneAndUpdate({
      phoneNumber,
    });
  } catch (error) {}
};

//get all products of a logged user

export const getProducts = async (currentPage) => {
  try {
    await connectDB();
    const session = await auth();

    const userId = new mongoose.Types.ObjectId(session.user.id);

    const pageSize = 5;
    const skip = (currentPage - 1) * pageSize;
    const totalProducts = await UserProduct.countDocuments({
      userId,
    });
    const products = await UserProduct.find({ userId })
      .skip(skip)
      .limit(pageSize)
      .populate("productId");

    const totalPages = Math.ceil(totalProducts / pageSize);
    return { products, totalPages };
  } catch (error) {
    console.log(error);
  }
};

//get products for purchases list
export const getProductsForPurchases = async () => {
  try {
    await connectDB();
    const session = await auth();

    const userId = new mongoose.Types.ObjectId(session.user.id);
    const products = await UserProduct.find({ userId })
      .populate("productId")
      .lean();

    // Efficiently convert all nested ObjectIds using a recursive function
    function convertObjectIdsToStrings(obj) {
      if (obj && typeof obj === "object") {
        if (obj instanceof mongoose.Types.ObjectId) {
          return obj.toString();
        } else {
          // Recursively convert nested objects
          for (const key in obj) {
            obj[key] = convertObjectIdsToStrings(obj[key]);
          }
        }
      }
      return obj;
    }

    // Apply the conversion to the products array
    products.forEach((product) => convertObjectIdsToStrings(product));

    return products;
  } catch (error) {
    console.log(error);
  }
};

//add a new product to a logged user

export const addProduct = async (product) => {
  await connectDB();
  const session = await auth();

  try {
    const newProduct = await new Product({
      productName: product.get("productName"),
      manufacturer: product.get("manufacturer"),
      productType: product.get("productType"),
      productGroup: product.get("productGroup"),
      price: product.get("price"),
    });

    const existingProduct = await Product.find({
      productName: product.get("productName"),
    });
    if (existingProduct[0]) {
      throw new Error("customer exists");
    }

    await newProduct.save();

    const newConnection = await new UserProduct({
      userId: new mongoose.Types.ObjectId(session.user.id),
      productId: newProduct._id,
    });

    await newConnection.save();
    revalidatePath("/products");
  } catch (error) {
    console.log(error);
    throw new Error("Saving product failed");
  }
};

//delete a product by its id
export const deleteProduct = async (productId) => {
  await connectDB();
  const session = await auth();

  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      throw new Error("product doesnt exist");
    }

    const connection = await UserProduct.deleteOne({
      productId,
      userId: new mongoose.Types.ObjectId(session.user.id),
    });

    if (!connection) {
      throw new Error("connection doesnt exist");
    }

    revalidatePath("/products");
  } catch (error) {
    console.error(error);
    throw new Error("deleting product failed");
  }
};

//get trestment list for a looged user
export const getTreatments = async (currentPage) => {
  try {
    await connectDB();
    const session = await auth();

    const userId = new mongoose.Types.ObjectId(session.user.id);

    const pageSize = 5;
    const skip = (currentPage - 1) * pageSize;
    const totalTreatments = await UserTreatment.countDocuments({
      userId,
    });
    const treatments = await UserTreatment.find({ userId })
      .skip(skip)
      .limit(pageSize)
      .populate("treatmentId");

    const totalPages = Math.ceil(totalTreatments / pageSize);
    return { treatments, totalPages };
  } catch (error) {
    console.log(error);
  }
};

//add a new treatment to a logged user

export const addTreatment = async (treatment) => {
  await connectDB();
  const session = await auth();

  try {
    const newTreatment = await new Treatment({
      treatmentName: treatment.get("treatmentName"),
      price: treatment.get("price"),
    });

    const existingTreatment = await Treatment.find({
      treatmentName: treatment.get("treatmentName"),
    });
    if (existingTreatment[0]) {
      throw new Error("treatment exists");
    }

    await newTreatment.save();

    const newConnection = await new UserTreatment({
      userId: new mongoose.Types.ObjectId(session.user.id),
      treatmentId: newTreatment._id,
    });

    await newConnection.save();
    revalidatePath("/treatments");
  } catch (error) {
    console.log(error);
    throw new Error("Saving treatment failed");
  }
};

//delete treatment by its id

export const deleteTreatment = async (treatmentId) => {
  await connectDB();
  const session = await auth();

  try {
    const treatment = await Treatment.findByIdAndDelete(treatmentId);
    if (!treatment) {
      throw new Error("treatment doesnt exist");
    }

    const connection = await UserTreatment.deleteOne({
      treatmentId,
      userId: new mongoose.Types.ObjectId(session.user.id),
    });

    if (!connection) {
      throw new Error("connection doesnt exist");
    }

    revalidatePath("/treatments");
  } catch (error) {
    console.error(error);
    throw new Error("deleting treatment failed");
  }
};

//get events list for a looged user
export const getEvents = async () => {
  try {
    await connectDB();
    const session = await auth();

    const userId = new mongoose.Types.ObjectId(session.user.id);

    const events = await Event.find({ userId }).populate([
      "treatmentId",
      "customerId",
    ]);

    return events;
  } catch (error) {
    console.log(error);
  }
};

//get purchases of a customer of a looged user

export const getPurchases = async (customerId) => {
  try {
    await connectDB();
    const session = await auth();

    const userId = new mongoose.Types.ObjectId(session.user.id);

    const purchases = await Purchase.find({ userId, customerId })
      .populate("productId")
      .lean();
    // Efficiently convert all nested ObjectIds using a recursive function
    function convertObjectIdsToStrings(obj) {
      if (obj && typeof obj === "object") {
        if (obj instanceof mongoose.Types.ObjectId) {
          return obj.toString();
        } else {
          // Recursively convert nested objects
          for (const key in obj) {
            obj[key] = convertObjectIdsToStrings(obj[key]);
          }
        }
      }
      return obj;
    }

    // Apply the conversion to the products array
    purchases.forEach((purchase) => convertObjectIdsToStrings(purchase));
    return purchases;
  } catch (error) {
    console.log(error);
  }
};

//add a new purchase to a client for a logged user

export const addPurchase = async (purchase) => {
  await connectDB();
  const session = await auth();

  try {
    const newPurchase = await new Purchase({
      productId: purchase.get("productId"),
      customerId: purchase.get("customerId"),
      userId: new mongoose.Types.ObjectId(session.user.id),
      purchaseDate: new Date(),
      quantity: purchase.get("quantity"),
    });

    await newPurchase.save();
    revalidatePath(`/clients/${newPurchase.customerId}`);
  } catch (error) {
    console.log(error);
    throw new Error("Saving treatment failed");
  }
};

//delete purchase by its id

export const deletePurchase = async (purchaseId) => {
  await connectDB();

  try {
    const purchase = await Purchase.findByIdAndDelete(purchaseId);
    if (!purchase) {
      throw new Error("purchase doesnt exist");
    }

    revalidatePath(`/clients/${purchase.customerId}`);
  } catch (error) {
    console.error(error);
    throw new Error("deleting purchase failed");
  }
};
