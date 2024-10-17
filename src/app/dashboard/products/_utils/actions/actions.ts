"use server";

import { BASEURL } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { TProductSchema } from "../types/types";



export const PostProduct = async (values: TProductSchema, token: string) => {
  try {
    const response = await fetch(`${BASEURL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify(values), // Access data from the request body
    });
    revalidatePath("/dashboard/products");
    const result = await response.json();
    ;
    return result;
  } catch (error) {
    ;
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const UpdateProduct = async (values: TProductSchema, token: string) => {
  try {
    const response = await fetch(`${BASEURL}/products/${values._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(values), // Access data from the request body
    });
    revalidatePath("/dashboard/products");
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

export const DeleteProduct = async (id: string, token: string) => {
  try {
    const response = await fetch(`${BASEURL}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        // Add other necessary headers (e.g., authorization)
      },
    });
    revalidatePath("/dashboard/products");
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

export const GetProduct = async (id: string) => {
  try {
    const response = await fetch(`${BASEURL}/products/${id}`, {
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

export const GetProducts = async (queryString?: string) => {
  try {
    
    const response = await fetch(
      `${BASEURL}/products${queryString ? "?" + queryString : ""}`,
      { cache: "no-store" }
    );
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
