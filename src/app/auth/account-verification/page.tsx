"use client";

import CirclesTriangle from "@/components/assets/auth/circles-triangle";
import ErrorBar from "@/components/atoms/error-bar";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface FormDataValues {
  otp: string;
}

const AccountVerification = () => {
  return (
    <div className="py-[90px]">
      <div className="relative container grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex items-center gap-[32px]">
          <CirclesTriangle className="max-w-[150px] h-auto" />
          <div className="max-w-[250px] flex flex-col gap-[16px]">
            <h1 className="text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] text-primary font-bold">
              Verify!
            </h1>
            <p className="text-[14px] md:text-[20px] font-medium">
              Please check your mail&nbsp;
              <span className="text-[14px] md:text-[20px] font-bold text-secondary">
                inbox
              </span>
            </p>
          </div>
        </div>
        <div className="p-[20px] md:p-[40px] rounded-[10px] border border-dark_gray backdrop-blur shadow-md max-w-[550px]">
          <form className="flex flex-col gap-[32px]">
            <div className="input-field">
              <label htmlFor="otp">Enter 5 Digit OTP</label>
              <input
                type="number"
                name="otp"
                placeholder="e.g. 123456"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-[16px]">
              <Button type="submit">Verify account</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AccountVerification;
