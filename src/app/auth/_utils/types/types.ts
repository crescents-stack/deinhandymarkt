import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const RegisterFormSchema = z
  .object({
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    phone: z.string().min(2).max(20),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Password and confirm password must match",
    path: ["confirmPassword"],
  });

export const ForgotFormSchema = z
  .object({
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    confirmEmail: z.string().email('Invalid email address').min(1, 'Confirm email is required')
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Email do not match",
    path: ["confirmEmail"],
  });

export const ResetFormSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TLoginFormSchema = z.infer<typeof LoginFormSchema>;
export type TRegisterFormSchema = z.infer<typeof RegisterFormSchema>;
export type TForgotFormSchema = z.infer<typeof ForgotFormSchema>;
export type TResetFormSchema = z.infer<typeof ResetFormSchema>;
