import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});

export const RegisterFormSchema = z
  .object({
    email: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    phone: z.string().min(2).max(20),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Password and confirm password must match",
  });

export const ForgotFormSchema = z
  .object({
    email: z.string().min(2).max(50),
    confirmEmail: z.string().min(2).max(50),
  })
  .refine((values) => values.email === values.confirmEmail, {
    message: "Email and Confirm Email must match",
  });

export const ResetFormSchema = z
  .object({
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Password and confirm password must match",
  });

export type TLoginFormSchema = z.infer<typeof LoginFormSchema>;
export type TRegisterFormSchema = z.infer<typeof RegisterFormSchema>;
export type TForgotFormSchema = z.infer<typeof ForgotFormSchema>;
export type TResetFormSchema = z.infer<typeof ResetFormSchema>;
