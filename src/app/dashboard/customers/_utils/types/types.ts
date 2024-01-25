// import { TFilterInputField } from "@/components/ui/datatable";
import { z } from "zod";

export const UserSchema = z.object({
  uid: z.object({
    _id: z.unknown(),
    name: z.object({
      firstName: z.string().min(3),
      lastName: z.string().min(3),
    }),
    email: z.string().email(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
  role: z.string(),
  status: z.string()
});

export const CustomerAccountBlockSchema = z.object({
  _id: z.string(),
  status: z.literal("active").or(z.literal("pending")).or(z.literal("blocked")),
  text: z
    .string()
    .min(3)
    .refine((value) => value === "BLOCKED", {
      message: "Please enter 'BLOCKED'!",
    }),
});

export type TUserSchema = z.infer<typeof UserSchema>;
export type TCustomerAccountBlockSchema = z.infer<
  typeof CustomerAccountBlockSchema
>;
