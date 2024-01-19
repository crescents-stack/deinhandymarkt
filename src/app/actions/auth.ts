"use server";

import { SomethingWentWrong } from "./errors";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const ALogin = async (body: { email: string; password: string }) => {
  try {
    const response = await fetch(BASE_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return SomethingWentWrong;
  }
};
