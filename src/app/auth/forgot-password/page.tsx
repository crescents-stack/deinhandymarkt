"use client";

import CirclesTriangle from "@/components/assets/auth/circles-triangle";
import ErrorBar from "@/components/atoms/error-bar";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";

export const loginFormSchema = z
  .object({
    email: z.string().email(),
    confirmEmail: z.string().email(),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails do not match",
    path: ["confirmEmail"],
  });

const ForgotPassword = () => {
  const [errors, setErrors] = useState({});
  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    try {
      const validatedData = loginFormSchema.parse(
        Object.fromEntries(new FormData(event.target))
      );
      setErrors({});
      console.log(validatedData);
      // If the data is valid, submit the form
    } catch (error: any) {
      // If the data is invalid, display an error message
      const tempErrors: any = {};
      let errors = JSON.parse(error);
      for (let i = 0; i < errors.length; i++) {
        tempErrors[`${errors[i].path[0]}`] = errors[i].message;
      }
      setErrors(tempErrors);
    }
  };
  return (
    <div className="py-[90px]">
      <div className="relative container grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex items-center gap-[32px]">
          <CirclesTriangle className="max-w-[150px] h-auto" />
          <div className="max-w-[250px] flex flex-col gap-[16px]">
            <h1 className="text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] text-primary font-bold">
              Forgot?
            </h1>
            <p className="text-[14px] md:text-[20px] font-medium">
              Already have account? Please&nbsp;
              <Link href="/auth/login">
                <span className="text-[14px] md:text-[20px] font-bold text-secondary">
                  login here
                </span>
              </Link>
            </p>
          </div>
        </div>
        <div className="p-[20px] md:p-[40px] rounded-[10px] border border-dark_gray backdrop-blur shadow-md max-w-[550px]">
          <form className="flex flex-col gap-[32px]" onSubmit={handleOnSubmit}>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="e.g. johndoe@example.com"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="confirmEmail">Email</label>
              <input type="confirmEmail" name="confirmEmail" required />
              <ErrorBar errors={errors} name="confirmEmail" />
            </div>
            <div className="grid grid-cols-1 gap-[16px]">
              <Button type="submit">Request for password reset</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
