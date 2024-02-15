import { z } from "zod";

export enum CombinationTypes {
  sizeColor = "sizeColor",
  size = "size",
  color = "color",
}

const Combination = z.object({
  size: z.string().optional(),
  color: z.string().optional(),
  price: z.number(),
  quantity: z.number(),
  subtotal: z.number(),
});
export type TCombination = z.infer<typeof Combination>

const CartAttribute = z.object({
  combinationType: z.literal("sizeColor").or(z.literal("color")).or(z.literal("size")),
  combinations: z.array(Combination),
  items: z.number(),
  subtotal: z.number(),
})

export type TCartAttribute = z.infer<typeof CartAttribute>

export const ProductSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(5).max(200),
  slug: z.string().min(3).max(100),
  category: z
    .string()
    .min(3)
    .max(50)
    .or(
      z.object({
        _id: z.string().min(3).max(50),
        name: z.string().min(3).max(50),
        slug: z.string().min(3).max(50),
      })
    ),
  productType: z.literal("simple_product").or(z.literal("variable_product")),
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

export const CartContextSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(5).max(200),
  slug: z.string().min(3).max(100),
  category: z
    .string()
    .min(3)
    .max(50)
    .or(
      z.object({
        _id: z.string().min(3).max(50),
        name: z.string().min(3).max(50),
        slug: z.string().min(3).max(50),
      })
    ),
  productType: z.literal("simple_product").or(z.literal("variable_product")),
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
  quantity: z.number().min(1),
  // basePrice: z.number().min(1),
  attributeCombinations: CartAttribute.optional()
});

export type TProductSchema = z.infer<typeof ProductSchema>;
export type TCartProductSchema = z.infer<typeof CartContextSchema>;
