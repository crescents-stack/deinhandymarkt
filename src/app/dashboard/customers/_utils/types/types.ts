import { z } from "zod";

export const UserSchema = z.object({
  _id: z.unknown(),
  name: z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
  }),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type TUserSchema = z.infer<typeof UserSchema>;
