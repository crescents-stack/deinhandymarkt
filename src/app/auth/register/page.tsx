"use client";

import CirclesTriangle from "@/components/assets/auth/circles-triangle";
import ErrorBar from "@/components/atoms/error-bar";
import PasswordInput from "@/components/atoms/password-field";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
interface FormDataValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
const Register = () => {
  
  return (
    <div className="py-[90px]">
      <div className="relative container grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="mx-auto md:mx-0 min-w-[300px] flex items-center gap-[32px]">
          <CirclesTriangle className="max-w-[150px] h-auto" />
          <div className="max-w-[250px] flex flex-col gap-[16px]">
            <h1 className="text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] text-primary font-bold">
              Register
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
        <div className="p-[20px] md:p-[40px] rounded-[10px] border border-dark_gray backdrop-blur shadow-md min-w-[300px] max-w-[550px] mx-auto md:mx-0">
          <form className="flex flex-col gap-[32px]">
            <div className="input-field">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                name="firstName"
                placeholder="e.g. John Doe"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                name="lastName"
                placeholder="e.g. John Doe"
                required
              />
            </div>
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
              <label htmlFor="phone">Phone</label>
              <input type="text" name="phone" required />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field">
              <label htmlFor="confirmPassword">Confirm password</label>
            </div>
            <div className="grid grid-cols-1 gap-[16px]">
              <Button type="submit">Register</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
