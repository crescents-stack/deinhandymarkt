import {z} from "zod";

export const BillingFormSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    salutation: z.string().min(1, "Salutation is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    reference: z.string().min(1, "Reference number is required"),
    telephone: z.string().min(1, "Telephone number is required"),
    street: z.string().min(1, "Address is required"),
    house: z.string().min(1, "House number is required"),
    pobox: z.string().min(1, "P.O Box is required"),
    plz: z.string().min(1, "PLZ is required"),
    location: z.string().min(1, "Location is required"),
    land: z.string().min(1, "Land is required"),
    message: z.string().min(1, "Message is required"),
  });