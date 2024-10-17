"use server";

import { BASEURL } from "@/lib/data";
import { revalidatePath } from "next/cache";

import { TVatCountrySchema } from "../types/types";

export const PostVat = async (values: TVatCountrySchema, token: string) => {
  try {
    const response = await fetch(`${BASEURL}/vat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify(values), // Access data from the request body
    });
    revalidatePath("/dashboard/vat");
    return await response.json();
  } catch (error) {
    ;
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const UpdateVat = async (values: TVatCountrySchema, token: string) => {
  try {
    const {_id} = values;
    const response = await fetch(`${BASEURL}/vat/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify(values), // Access data from the request body
    });
    revalidatePath("/dashboard/vat");
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

export const DeleteVat = async (id: string, token: string) => {
  try {
    const response = await fetch(`${BASEURL}/vat/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        // Add other necessary headers (e.g., authorization)
      },
    });
    revalidatePath("/dashboard/vat");
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

export const GetVat = async (slug: string) => {
  try {
    const response = await fetch(`${BASEURL}/vat/${slug}`, {
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

export const GetVats = async () => {
  try {
    const response = await fetch(`${BASEURL}/vat`, { cache: "no-store" });
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
