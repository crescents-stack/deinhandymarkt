"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import AuthGraphic from "@/components/molecules/auth-graphic";
import {
  ForgotFormSchema,
  TForgotFormSchema,
} from "@/app/auth/_utils/types/types";
import InputField from "@/components/atoms/input-field";
import { ActionResponseHandler } from "@/lib/error";
import { ForgotPasswordAction } from "../_utils/actions/actions";

const ForgotPassword = () => {
  const form = useForm<TForgotFormSchema>({
    resolver: zodResolver(ForgotFormSchema),
    defaultValues: {
      email: "",
      confirmEmail: "",
    },
  });

  // form submission handler
  const onSubmit = async (values: TForgotFormSchema) => {
    // action on successfull response
    const result = await ForgotPasswordAction(values);
    ActionResponseHandler(result, "Forgot Password");
  };

  return (
    <div className="py-[90px]">
      <div className="relative container grid grid-cols-1 md:grid-cols-2 gap-10">
        <AuthGraphic
          H1="Forgot?"
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
              <InputField
                form={form}
                name="email"
                label="Email"
                placeholder="e.g. hello@example.com"
              />
              <InputField
                form={form}
                name="confirmEmail"
                label="Confirm Email"
                placeholder="e.g. hello@example.com"
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
export default ForgotPassword;
