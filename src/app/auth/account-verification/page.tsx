"use client";
import AuthGraphic from "@/components/molecules/auth-graphic";

import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { AccountVeficationAction } from "../_utils/actions/actions";
import { useRouter } from "next/navigation";
import { ActionResponseHandler } from "@/lib/error";
const AccountVerification = ({
  searchParams,
}: {
  searchParams: { token: string; otp: string };
}) => {
  const Router = useRouter();
  const { token, otp } = searchParams;
  const [otpValue, setOtpValue] = useState(otp);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { requestId: token, otp: parseInt(otp) };
    const response = await AccountVeficationAction(data);
    ActionResponseHandler(response, "Account Verification");
    if (response.success) {
      Router.push("/auth/login");
    }
  };
  return (
    <div className="py-[90px]">
      <div className="relative container grid grid-cols-1 md:grid-cols-2 gap-10">
        <AuthGraphic
          H1="Verify"
          text="Already have account?"
          linkText="Please login"
          link="/auth/login"
        />
        <div className="p-[20px] md:p-[40px] rounded-[10px] border border-dark_gray backdrop-blur shadow-md max-w-[550px]">
          <form onSubmit={onSubmit} className="flex flex-col gap-[32px]">
            <div className="input-field">
              <label htmlFor="otp">Enter 5 Digit OTP</label>
              <input
                type="number"
                name="otp"
                placeholder="e.g. 123456"
                defaultValue={parseInt(otpValue)}
                onChange={(e) => setOtpValue(e.target.value)}
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
