import { z } from "zod";

export const ProductSchema = z.object({
  _id: z.unknown(),
  name: z.string().min(5).max(200),
  slug: z.string().min(3).max(100),
  category: z.string().min(3).max(50),
  productType: z.literal("simple_product"),
  price: z.number().min(1),
  discount: z.object({
    type: z.literal("percentage").or(z.literal("fixed")),
    value: z.number().min(0),
  }),
  images: z.array(z.string()),
  thumbnail: z.string().min(1),
  stock: z.number().min(1),
  description: z.string().min(20).max(2000),
  short_description: z.string().min(20).max(600),
  attributes: z.array(
    z.object({
      label: z.string().min(3),
      values: z.array(z.string()),
    })
  ),
  tags: z.array(z.string()),
  metadata: z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(2000),
  }),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

export type TProductSchema = z.infer<typeof ProductSchema>;