"use server";

import { BASEURL } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { PRINT } from "@/lib/utils";

export const PostOrder = async (values: any) => {
  try {
    const response = await fetch(`${BASEURL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify(values), // Access data from the request body
    });
    revalidatePath("/dashboard/orders");
    const result = await response.json();
    console.log(result)
    return result;
  } catch (error) {
    PRINT(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const UpdateOrder = async (values: any, token: string) => {
  try {
    const response = await fetch(`${BASEURL}/orders/${values._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values), // Access data from the request body
    });
    revalidatePath("/dashboard/orders");
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

export const UpdatePaymentStatus = async (_id: any) => {
  try {
    console.log(_id)
    const response = await fetch(`${BASEURL}/orders/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify({ status: "processing", paymentStatus: "paid" }), // Access data from the request body
    });
    revalidatePath("/dashboard/orders");
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

export const DeleteOrder = async (id: string, token: string) => {
  try {
    PRINT({ id, token });
    const response = await fetch(`${BASEURL}/orders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/dashboard/orders");
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

export const GetOrder = async (id: string) => {
  try {
    PRINT({ id });
    const response = await fetch(`${BASEURL}/orders/${id}`, {
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

export const GetOrders = async () => {
  try {
    const response = await fetch(
      `${BASEURL}/orders?sortOrder=desc&limit=1000`,
      {
        cache: "no-store",
      }
    );
    const result = await response.json();
    // PRINT(result);
    return result;
  } catch (error) {
    PRINT(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};
