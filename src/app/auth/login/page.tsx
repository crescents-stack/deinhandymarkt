"use client";

import Toggler from "@/components/atoms/toggler";
import Link from "next/link";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordField from "@/components/atoms/password-field";
import AuthGraphic from "@/components/molecules/auth-graphic";

const FormSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});

type TFormSchema = z.infer<typeof FormSchema>;

const Login = () => {
  const router = useRouter();
  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // form submission handler
  const onSubmit = async (values: TFormSchema) => {
    // action on successfull response
    console.log(values)
  };

  return (
    <div className="py-[90px]">
      <div className="relative container grid grid-cols-1 md:grid-cols-2 gap-10">
        <AuthGraphic
          H1="Login"
          text="Already have account?"
          link="/register"
          linkText="Please register!"
        />
        <div className="p-[20px] md:p-[40px] rounded-[10px] border border-dark_gray backdrop-blur shadow-md min-w-[300px] max-w-[550px] mx-auto md:mx-0 input-field">
          <Form {...form}>
            <form
              className="flex flex-col gap-[32px]"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g hello@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PasswordField form={form} name="password" />
              <div className="grid grid-cols-1 gap-[16px]">
                <div className="flex items-center justify-between gap-[10px]">
                  <Toggler text="Remember me" textSize="" />
                  <Link href="/auth/forgot-password" className="mt-[-15px]">
                    Forgot password?
                  </Link>
                </div>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Login..." : "Login"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
