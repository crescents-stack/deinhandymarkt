"use server";

import { BASEURL } from "@/lib/data";
import { TCategorySchema } from "../types/types";
import { revalidatePath } from "next/cache";

export const PostCategory = async (values: TCategorySchema) => {
  try {
    const response = await fetch(`${BASEURL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify(values), // Access data from the request body
    });
    revalidatePath("/dashboard/category");
    return await response.json();
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const UpdateCategory = async (values: TCategorySchema) => {
  try {
    const response = await fetch(`${BASEURL}/category`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify(values), // Access data from the request body
    });
    revalidatePath("/dashboard/category");
    return await response.json();
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const DeleteCategory = async (id: string) => {
  try {
    const response = await fetch(`${BASEURL}/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers (e.g., authorization)
      },
    });
    revalidatePath("/dashboard/category");
    return await response.json();
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const GetCategory = async (id: string) => {
  try {
    const response = await fetch(`${BASEURL}/category/${id}`, {
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

export const GetCategories = async () => {
  try {
    const response = await fetch(`${BASEURL}/category`, { cache: "no-store" });
    return await response.json();
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};
