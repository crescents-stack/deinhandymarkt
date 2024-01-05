"use client";

import CirclesTriangle from "@/components/assets/auth/circles-triangle";
import ErrorBar from "@/components/atoms/error-bar";
import PasswordInput from "@/components/atoms/password-input";

import { Button } from "@/components/ui/button";
import { POST } from "@/lib/api/fetcher";
import { useLoadingContext } from "@/lib/contexts/loading.provider";
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
  const { setLoading } = useLoadingContext();
  const [errors, setErrors] = useState({});

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues: FormDataValues = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const errorsFound: any = validator(formValues);
    // if there is no error the proceed to submission
    if (Object.keys(errorsFound).length === 0) {
      const { firstName, lastName, email, password, phone } = formValues;
      POST(
        "auth/register",
        {
          name: { firstName, lastName },
          email,
          password,
          phone,
        },
        setLoading
      );
    }
    setErrors(errorsFound);
  };

  const validator = (data: FormDataValues) => {
    let obj: any = {};
    if (!data.firstName.trim()) {
      obj.firstName = "First name is required!";
    }
    if (!data.lastName.trim()) {
      obj.lastName = "Last name is required!";
    }
    if (!data.email.trim()) {
      obj.email = "Email is required!";
    }
    if (!data.phone.trim()) {
      obj.phone = "Phone is required!";
    }
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
          <form className="flex flex-col gap-[32px]" onSubmit={handleOnSubmit}>
            <div className="input-field">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                name="firstName"
                placeholder="e.g. John Doe"
                required
              />
              <ErrorBar errors={errors} name="firstName" />
            </div>
            <div className="input-field">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                name="lastName"
                placeholder="e.g. John Doe"
                required
              />
              <ErrorBar errors={errors} name="lastName" />
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
              <ErrorBar errors={errors} name="lastName" />
            </div>
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
              <Button type="submit">Register</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
