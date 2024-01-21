"use client";

import Toggler from "@/components/atoms/toggler";
import Link from "next/link";

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
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { LoginFormSchema, TLoginFormSchema } from "@/app/_utils/types/types";
import { LoginAction } from "@/app/_utils/actions/actions";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const { toast } = useToast();
  const { auth, setAuth } = useAuthContext();
  const form = useForm<TLoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log({ auth, setAuth });

  // form submission handler
  const onSubmit = async (values: TLoginFormSchema) => {
    // action on successfull response
    const result = await LoginAction(values);
    toast({
      variant: result.success ? "default" : "destructive",
      title: "User login",
      description: result.message,
    });
    if (result.success) {
      setAuth({ ...result.data });
    }
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
