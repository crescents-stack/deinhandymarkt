import { BillingFormSchema } from "@/app/checkout/_utils/types/types";
import { z } from "zod";

export const OrdersSchema = z.object({
  _id: z.string().optional(),
  lineItems: z.array(
    z.object({
      productId: z.string(),
      price: z.number().min(0),
      quantity: z.number().min(1),
    })
  ),
  shippingAddress: BillingFormSchema,
  billingAddress: BillingFormSchema,
  shippingCost: z.number().min(0),
  shippingMethod: z.string().min(3),
  tax: z.number().min(0),
  paymentStatus: z.string(),
  status: z.string(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});
// 'pending' | 'hold' | 'processing' | 'packed' | 'shipped' | 'delivered'
export const OrderStatusFormSchema = z.object({
  _id: z.string().optional(),
  status: z
    .literal("pending")
    .or(z.literal("hold"))
    .or(z.literal("processing"))
    .or(z.literal("packed"))
    .or(z.literal("shipped"))
    .or(z.literal("delivered")),
});

export type TOrdersSchema = z.infer<typeof OrdersSchema>;
export type TOrderStatusFormSchema = z.infer<typeof OrderStatusFormSchema>;
