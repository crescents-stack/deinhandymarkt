"use client";

import CirclesTriangle from "@/components/assets/auth/circles-triangle";
import ErrorBar from "@/components/atoms/error-bar";

import { Button } from "@/components/ui/button";
import { POST } from "@/lib/api/fetcher";
import { useLoadingContext } from "@/lib/contexts/loading.provider";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface FormDataValues {
  otp: string;
}

const AccountVerification = () => {
  const [errors, setErrors] = useState({});
  const { setLoading } = useLoadingContext();
  const params = useSearchParams();
  const router = useRouter();

  // form submission handler
  const handleOnSubmit = async (event: any) => {
    event.preventDefault();
    // getting form inputs
    const formData = new FormData(event.currentTarget);
    const formValues: FormDataValues = {
      otp: formData.get("otp") as string,
    };
    const otp = parseInt(formValues.otp);
    if (otp && `${otp}`.length === 5) {
      setErrors({});
      console.log(formValues);
      const result = await POST(
        "/auth/confirm-account",
        {
          requestId: params.get("token"),
          otp,
        },
        setLoading
      );
      console.log(result);
      if (result) {
        router.push("/auth/login");
      }
    } else {
      setErrors({ otp: "Invalid OTP" });
    }
  };
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
          <form className="flex flex-col gap-[32px]" onSubmit={handleOnSubmit}>
            <div className="input-field">
              <label htmlFor="otp">Enter 5 Digit OTP</label>
              <input
                type="number"
                name="otp"
                placeholder="e.g. 123456"
                defaultValue={parseInt(params.get("otp")!)}
                required
              />
              <ErrorBar errors={errors} name="otp" />
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
