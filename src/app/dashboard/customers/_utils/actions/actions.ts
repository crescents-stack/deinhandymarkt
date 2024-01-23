"use server";

import { BASEURL } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { TUserSchema } from "../types/types";

export const PostCustomer = async (values: TUserSchema) => {
  try {
    const response = await fetch(`${BASEURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify(values), // Access data from the request body
    });
    revalidatePath("/dashboard/customers");
    return await response.json();
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const UpdateCustomer = async (values: TUserSchema) => {
  try {
    const response = await fetch(`${BASEURL}/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify(values), // Access data from the request body
    });
    revalidatePath("/dashboard/customers");
    return await response.json();
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const DeleteCustomer = async (id: string) => {
  try {
    const response = await fetch(`${BASEURL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers (e.g., authorization)
      },
    });
    revalidatePath("/dashboard/customers");
    return await response.json();
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const GetCustomer = async (id: string) => {
  try {
    const response = await fetch(`${BASEURL}/users/${id}`, {
      cache: "no-store",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const GetCustomers = async () => {
  try {
    const response = await fetch(`${BASEURL}/users`, { cache: "no-store" });
    return await response.json();
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};
