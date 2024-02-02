import { z } from "zod";

export const ContactFormSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  orderId: z.string().optional(),
  message: z.string().min(3),
});
export type TContactFormSchema = z.infer<typeof ContactFormSchema>;
