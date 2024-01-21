"use client";

import CirclesTriangle from "@/components/assets/auth/circles-triangle";
import AuthGraphic from "@/components/molecules/auth-graphic";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <div className="py-[90px]">
      <div className="relative container grid grid-cols-1 md:grid-cols-2 gap-10">
        <AuthGraphic H1/>
        <div className="p-[20px] md:p-[40px] rounded-[10px] border border-dark_gray backdrop-blur shadow-md max-w-[550px]">
          <form className="flex flex-col gap-[32px]">
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
              <label htmlFor="confirmEmail">Confirm email</label>
              <input type="confirmEmail" name="confirmEmail" required />
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
