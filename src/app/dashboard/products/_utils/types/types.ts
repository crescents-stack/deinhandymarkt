import { z } from "zod";

const ProductSchema = z.object({
  _id: z.unknown(),
  name: z.string(),
  slug: z.string(),
  category: z.string(),
  productType: z.literal("simple_product"),
  price: z.number(),
  discount: z.object({
    type: z.literal("fixed"),
    value: z.number(),
  }),
  images: z.array(z.string()),
  thumbnail: z.string(),
  stock: z.number(),
  description: z.string(),
  short_description: z.string(),
  attributes: z.array(
    z.object({
      label: z.string(),
      values: z.array(z.string()),
    })
  ),
  tags: z.array(z.string()),
  metadata: z.object({
    title: z.string(),
    description: z.string(),
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
