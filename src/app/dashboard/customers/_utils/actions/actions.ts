"use server";

import { BASEURL } from "@/lib/data";
import { revalidatePath } from "next/cache";
import {
  TCustomerAccountBlockSchema,
  TUpdateFormSchema,
  TUserSchema,
} from "../types/types";
import { PRINT } from "@/lib/utils";

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
    const result = await response.json();
    return result;
  } catch (error) {
    PRINT(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const UpdateCustomer = async (
  values: TUpdateFormSchema,
  token: string
) => {
  try {
    const response = await fetch(`${BASEURL}/users/${values.uid._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values.uid), // Access data from the request body
    });
    revalidatePath("/dashboard/customers");
    const result = await response.json();
    PRINT(result)
    return result;
  } catch (error) {
    PRINT(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const BlockCustomer = async (values: TCustomerAccountBlockSchema) => {
  try {
    const response = await fetch(`${BASEURL}/auth/change-status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify({ id: values._id, status: values.status }), // Access data from the request body
    });
    revalidatePath("/dashboard/customers");
    const result = await response.json();
    PRINT(result);
    return result;
  } catch (error) {
    PRINT(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};
export const DeleteCustomer = async (id: string, token: string) => {
  try {
    PRINT({id, token})
    const response = await fetch(`${BASEURL}/auth/delete-account/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/dashboard/customers");
    const result = await response.json();
    PRINT(result);
    return result;
  } catch (error) {
    PRINT(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const GetCustomer = async (id: string) => {
  try {
    PRINT({ id });
    const response = await fetch(`${BASEURL}/users/${id}`, {
      cache: "no-store",
    });
    const result = await response.json();
    PRINT({ result });
    return result;
  } catch (error) {
    PRINT(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const GetCustomers = async () => {
  try {
    const response = await fetch(`${BASEURL}/users`, { cache: "no-store" });
    const result = await response.json();
    PRINT(result)
    return result;
  } catch (error) {
    PRINT(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};
