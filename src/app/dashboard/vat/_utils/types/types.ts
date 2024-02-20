import { z } from "zod";

export const VatCountrySchema = z.object({
  _id: z.unknown(),
  countryName: z.string().min(3),
  countryCode: z.string().optional(),
  vatAmountInPercent: z.number().min(1),
});

export type TVatCountrySchema = z.infer<typeof VatCountrySchema>;
