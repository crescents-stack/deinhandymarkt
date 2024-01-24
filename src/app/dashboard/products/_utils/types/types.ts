import { z } from "zod";

export const ProductSchema = z.object({
  _id: z.unknown(),
  name: z.string().min(5).max(100),
  slug: z.string().min(3).max(50),
  category: z.string().min(3).max(50),
  productType: z.literal("simple_product"),
  price: z.number().min(1),
  discount: z.object({
    type: z.literal("percentage").or(z.literal("fixed")),
    value: z.number().min(1),
  }),
  images: z.array(z.string()),
  thumbnail: z.string().min(1),
  stock: z.number().min(1),
  description: z.string().min(20).max(200),
  short_description: z.string().min(20).max(60),
  attributes: z.array(
    z.object({
      label: z.string().min(3),
      values: z.array(z.string()),
    })
  ),
  tags: z.array(z.string()),
  metadata: z.object({
    title: z.string().min(3).max(50),
    description: z.string().min(20).max(200),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TProductSchema = z.infer<typeof ProductSchema>;

export const DummyProducts: TProductSchema[] = [
  {
    _id: "asedfasdf",
    name: "Smart watch",
    slug: "smartwatch",
    category: "watch",
    productType: "simple_product",
    price: 400,
    discount: {
      type: "fixed",
      value: 100,
    },
    images: ["/images/products/black.jpeg", "/images/products/black.jpeg"],
    thumbnail: "/images/products/black.jpeg",
    stock: 23,
    description: "description",
    short_description: "short description",
    attributes: [
      {
        label: "label",
        values: ["value1", "value2"],
      },
    ],
    tags: ["product1", "product2"],
    metadata: {
      title: "title",
      description: "description",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "dafasdfaewcasdf",
    name: "Smart Watch 2000",
    slug: "smart-watch-2000",
    category: "electronics",
    productType: "simple_product",
    price: 2500,
    discount: {
      type: "fixed",
      value: 300,
    },
    images: [
      "/images/products/black.jpeg",
      "/images/products/black.jpeg",
      "/images/products/black.jpeg",
    ],
    thumbnail: "/images/products/black.jpeg",
    stock: 100,
    description: "Product details description",
    short_description: "Product short description",
    attributes: [
      {
        label: "color",
        values: ["black", "white", "red"],
      },
    ],
    tags: ["black_friday"],
    metadata: {
      title: "Smart Watch 2000",
      description: "The latest smartwatch with amazing features.",
    },
    createdAt: new Date(), // Placeholder for createdAt
    updatedAt: new Date(), // Placeholder for updatedAt
  },
];
