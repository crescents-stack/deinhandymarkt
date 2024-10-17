"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import AuthGraphic from "@/components/molecules/auth-graphic";
import {
  ResetFormSchema,
  TResetFormSchema,
} from "@/app/auth/_utils/types/types";
import { ActionResponseHandler } from "@/lib/error";
import PasswordField from "@/components/atoms/password-field";
import { ResetPasswordAction } from "../_utils/actions/actions";
import { useRouter } from "next/navigation";


const ResetPassword = ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const Router = useRouter();
  const form = useForm<TResetFormSchema>({
    resolver: zodResolver(ResetFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // form submission handler
  const onSubmit = async (values: TResetFormSchema) => {
    // action on successfull response
    const result = await ResetPasswordAction({
      requestId: searchParams.token,
      newPassword: values.password,
    });
    ActionResponseHandler(result, "Reset Password");
    if (result.success) {
      Router.push("/auth/login");
    }
  };

  return (
    <div className="py-[90px]">
      <div className="relative container grid grid-cols-1 md:grid-cols-2 gap-10">
        <AuthGraphic
          H1="Reset?"
          text="Already have account?"
          link="/auth/register"
          linkText="Please register!"
        />
        <div className="p-[20px] md:p-[40px] rounded-[10px] border border-dark_gray backdrop-blur shadow-md min-w-[300px] max-w-[550px] mx-auto md:mx-0 input-field">
          <Form {...form}>
            <form
              className="flex flex-col gap-[32px]"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <PasswordField form={form} name="password" label="Password" />
              <PasswordField
                form={form}
                name="confirmPassword"
                label="Confirm Password"
              />
              <div className="grid grid-cols-1 gap-[16px]">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting
                    ? "Requesting..."
                    : "Request access"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
