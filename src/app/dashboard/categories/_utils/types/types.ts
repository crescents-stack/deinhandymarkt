import { z } from "zod";

export const CategorySchema = z.object({
  _id: z.unknown(),
  name: z.string().min(3),
  slug: z.string().min(3),
  icon: z.string().min(3, "Icon is required"),
  blog: z.string().min(3),
  // parentId: z.string(),
  tags: z.array(z.string()),
  metadata: z.object({
    title: z.string().min(3),
    description: z.string().min(3),
  }),
});

export type TCategorySchema = z.infer<typeof CategorySchema>;
