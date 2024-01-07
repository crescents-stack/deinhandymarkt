"use client";

import CirclesTriangle from "@/components/assets/auth/circles-triangle";
import ErrorBar from "@/components/atoms/error-bar";
import PasswordInput from "@/components/atoms/password-input";
import Toggler from "@/components/atoms/toggler";

import { Button } from "@/components/ui/button";
import { POST } from "@/lib/api/fetcher";
import { useLoadingContext } from "@/lib/contexts/loading.provider";
import { useUserContext } from "@/lib/contexts/user.provider";
import { FormSubmit } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormDataValues {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const { setLoading } = useLoadingContext();
  const { setUserData } = useUserContext();
  const [errors, setErrors] = useState({});

  // form submission handler
  const handleOnSubmit = async (event: FormSubmit) => {
    event.preventDefault();

    // getting form inputs
    const formData = new FormData(event.currentTarget);
    const formValues: FormDataValues = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    // input validation
    const errorsFound: any = validator(formValues);

    // API fetch with successfull validation
    if (Object.keys(errorsFound).length === 0) {
      const result: any = await POST("/auth/login", formValues, setLoading);

      // action on successfull response
      if (result.data) {
        setUserData(result.data);
        const previousLocation =
          localStorage.getItem("from_location") || "/dashboard";
        router.push(previousLocation);
      }
    }
    setErrors(errorsFound);
  };

  const validator = (data: FormDataValues) => {
    let obj: any = {};
    if (!data.email.trim()) {
      obj.email = "Email is required!";
    }
    if (!data.password.trim()) {
      obj.password = "Password is required!";
    } else {
      if (data.password.length < 8) {
        obj.password = "Password must contain 8 character(s)";
      }
    }

    return obj;
  };
  return (
    <div className="py-[90px]">
      <div className="relative container grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="mx-auto md:mx-0 min-w-[300px] flex items-center gap-[32px]">
          <CirclesTriangle className="max-w-[150px] h-auto" />
          <div className="max-w-[250px] flex flex-col gap-[16px]">
            <h1 className="text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] text-primary font-bold">
              Login
            </h1>
            <p className="text-[14px] md:text-[20px] font-medium">
              Don&apos;t have account? Please&nbsp;
              <Link href="/auth/register">
                <span className="text-[14px] md:text-[20px] font-bold text-secondary">
                  register
                </span>
              </Link>
              &nbsp;here
            </p>
          </div>
        </div>
        <div className="p-[20px] md:p-[40px] rounded-[10px] border border-dark_gray backdrop-blur shadow-md min-w-[300px] max-w-[550px] mx-auto md:mx-0">
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
              <label htmlFor="password">Password</label>
              <PasswordInput name="password" />
              <ErrorBar errors={errors} name="password" />
            </div>
            <div className="grid grid-cols-1 gap-[16px]">
              <div className="flex items-center justify-between gap-[10px]">
                <Toggler text="Remember me" textSize="" />
                <Link href="/auth/forgot-password" className="mt-[-15px]">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit">Login</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
