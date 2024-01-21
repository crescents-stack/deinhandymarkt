import * as z from "zod";

export const LoginFormSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
  });
  
 export type TLoginFormSchema = z.infer<typeof LoginFormSchema>;