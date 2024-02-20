// import { TFilterInputField } from "@/components/ui/datatable";
import { BillingFormSchema } from "@/app/checkout/_utils/types/types";
import { z } from "zod";

export const UserSchema = z.object({
  _id: z.string(),
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
  status: z.string(),
});

export const CustomerAccountBlockSchema = z.object({
  _id: z.string(),
  status: z.literal("active").or(z.literal("pending")).or(z.literal("blocked")),
});

export const UpdateFormSchema = z.object({
  uid: z.object({
    name: z.object({
      firstName: z.string().min(3),
      lastName: z.string().min(3),
    }),
    _id: z.string(),
  }),
});

const SingleUserSchema = z.object({
  uid: z.object({
    _id: z.string(),
    name: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
    email: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    billingAddress: BillingFormSchema,
    image: z.string(),
    shippingAddress: BillingFormSchema,
  }),
  role: z.string(),
  status: z.string(),
});

export type TUpdateFormSchema = z.infer<typeof UpdateFormSchema>;
export type TUserSchema = z.infer<typeof UserSchema>;
export type TCustomerAccountBlockSchema = z.infer<
  typeof CustomerAccountBlockSchema
>;
export type TSingleUserSchema = z.infer<typeof SingleUserSchema>;
