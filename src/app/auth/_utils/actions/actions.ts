"use server";

import { BASEURL, CLIENTURL } from "@/lib/data";
import {
  TForgotFormSchema,
  TLoginFormSchema,
  TRegisterFormSchema,
} from "../types/types";

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
    console.log(result)
    return result;
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

export const ForgotPasswordAction = async (values: TForgotFormSchema) => {
  try {
    const response = await fetch(`${BASEURL}/auth/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify({
        email: values.email,
        redirect_resetPasswordPage_url: CLIENTURL + "/auth/reset-password",
      }), // Access data from the request body
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

export const ResetPasswordAction = async (values: {
  requestId: string;
  newPassword: string;
}) => {
  try {
    const response = await fetch(`${BASEURL}/auth/reset-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Add other necessary headers (e.g., authorization)
      },
      body: JSON.stringify(values), // Access data from the request body
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
