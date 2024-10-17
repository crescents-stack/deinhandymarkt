"use server";

import { BASEURL } from "@/lib/data";
import { TCategorySchema } from "../types/types";
import { revalidatePath } from "next/cache";


export const PostCategory = async (values: TCategorySchema, token: string) => {
  try {
    const response = await fetch(`${BASEURL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify(values), // Access data from the request body
    });
    revalidatePath("/dashboard/category");
    const result = await response.json();
    return result;
  } catch (error) {
    ;
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const UpdateCategory = async (values: TCategorySchema, token: string) => {
  try {
    const {_id} = values;
    const response = await fetch(`${BASEURL}/category/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify(values), // Access data from the request body
    });
    revalidatePath("/dashboard/category");
    const result = await response.json();
    return result;
  } catch (error) {
    ;
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const DeleteCategory = async (id: string, token: string) => {
  try {
    const response = await fetch(`${BASEURL}/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        // Add other necessary headers (e.g., authorization)
      },
    });
    revalidatePath("/dashboard/category");
    const result = await response.json();
    return result;
  } catch (error) {
    ;
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const GetCategory = async (slug: string) => {
  try {
    const response = await fetch(`${BASEURL}/category/${slug}`, {
      cache: "no-store",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    ;
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const GetCategories = async () => {
  try {
    const response = await fetch(`${BASEURL}/category`, { cache: "no-store" });
    const result = await response.json();
    return result;
  } catch (error) {
    ;
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};
