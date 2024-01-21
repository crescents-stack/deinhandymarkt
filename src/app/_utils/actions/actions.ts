"use server";

import { TLoginFormSchema } from "../types/types";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

export const LoginAction = async (data: TLoginFormSchema) => {
  try {
    const response = await fetch(`${BASEURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify(data), // Access data from the request body
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};
