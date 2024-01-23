"use server";

import { BASEURL } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { TProductSchema } from "../types/types";

export const PostProduct = async (values: TProductSchema) => {
  try {
    const response = await fetch(`${BASEURL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify(values), // Access data from the request body
    });
    revalidatePath("/dashboard/products");
    return await response.json();
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const UpdateProduct = async (values: TProductSchema) => {
  try {
    const response = await fetch(`${BASEURL}/products`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify(values), // Access data from the request body
    });
    revalidatePath("/dashboard/products");
    return await response.json();
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const DeleteProduct = async (id: string) => {
  try {
    const response = await fetch(`${BASEURL}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers (e.g., authorization)
      },
    });
    revalidatePath("/dashboard/products");
    return await response.json();
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const GetProduct = async (id: string) => {
  try {
    const response = await fetch(`${BASEURL}/products/${id}`, {
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

export const GetProducts = async () => {
  try {
    // const response = await fetch(`${BASEURL}/products`, { cache: "no-store" });
    // return await response.json();
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};
