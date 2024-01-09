"use client";

import CirclesTriangle from "@/components/assets/auth/circles-triangle";
import ErrorBar from "@/components/atoms/error-bar";
import PasswordInput from "@/components/atoms/password-input";

import { Button } from "@/components/ui/button";
import { UPDATE } from "@/lib/api/fetcher";
import { useLoadingContext } from "@/lib/contexts/loading.provider";
import { FormSubmit } from "@/lib/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
interface FormDataValues {
  password: string;
  confirmPassword: string;
}
const ResetPassword = () => {
  const { setLoading } = useLoadingContext();
  const params = useSearchParams();
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const handleOnSubmit = async (event: FormSubmit) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues: FormDataValues = {
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const errorsFound: any = validator(formValues);
    if (Object.keys(errorsFound).length === 0) {
      console.log(formValues);
      const token = params.get("token");
      console.log(token);
      const result = await UPDATE(
        "/auth/reset-password",
        { newPassword: formValues.password, requestId: token },
        setLoading
      );
      if (result) {
        router.push("/auth/login");
      }
    }
    setErrors(errorsFound);
  };

  const validator = (data: FormDataValues) => {
    let obj: any = {};
    if (!data.password.trim()) {
      obj.password = "Password is required!";
    } else {
      if (data.password.length < 8) {
        obj.password = "Password must contain 8 character(s)";
      }
    }
    if (!data.confirmPassword.trim()) {
      obj.confirmPassword = "Password is required!";
    } else {
      if (data.confirmPassword.length < 8) {
        obj.confirmPassword = "Password must contain 8 character(s)";
      } else if (data.confirmPassword !== data.password) {
        obj.confirmPassword = "Passwords not matched";
      }
    }

    return obj;
  };
  return (
    <div className="py-[90px]">
      <div className="relative container grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex items-center gap-[32px]">
          <CirclesTriangle className="max-w-[150px] h-auto" />
          <div className="max-w-[250px] flex flex-col gap-[16px]">
            <h1 className="text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] text-primary font-bold">
              Reset!
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
              <label htmlFor="password">Password</label>
              <PasswordInput name="password" />
              <ErrorBar errors={errors} name="password" />
            </div>
            <div className="input-field">
              <label htmlFor="confirmPassword">Confirm password</label>
              <PasswordInput name="confirmPassword" />
              <ErrorBar errors={errors} name="confirmPassword" />
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
export default ResetPassword;
