"use server";

import { BASEURL } from "@/lib/data";

import { TContactFormSchema } from "../types/types";

export const ContactAction = async (data: TContactFormSchema) => {
  try {
    const response = await fetch(`${BASEURL}/send-mail/contact-us`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify({
        receiverEmail: "musiur.opu@gmail.com",
        variables: data,
      }), // Access data from the request body
    });
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
