"use server";

import { TLoginFormSchema, TRegisterFormSchema } from "../types/types";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
const CLIENTURL = process.env.NEXT_PUBLIC_CLIENT_URL;

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
    return await response.json();
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const RegisterAction = async (values: TRegisterFormSchema) => {
  const { email, password, phone, firstName, lastName } = values;
  try {
    const body = {
      name: {
        firstName,
        lastName,
      },
      email,
      phone,
      password,
      redirect_confirmAccountPage_url: `${CLIENTURL}/auth/account-verification`,
    };
    console.log({ body });
    const response = await fetch(`${BASEURL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify(body), // Access data from the request body
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

export const AccountVeficationAction = async (body: {
  requestId: string;
  otp: number;
}) => {
  try {
    const response = await fetch(`${BASEURL}/auth/confirm-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify(body), // Access data from the request body
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
