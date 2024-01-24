import { TFilterInputField } from "@/components/ui/datatable";

export const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
export const CLIENTURL = process.env.NEXT_PUBLIC_CLIENT_URL;

export type TSteps = { id: number; text: string; path: string };
export const steps: TSteps[] = [
  {
    id: 1,
    text: "Checkout",
    path: "/checkout",
  },
  {
    id: 2,
    text: "Billing Address",
    path: "/checkout/billing-address",
  },
  {
    id: 3,
    text: "Payment Methods",
    path: "/checkout/payment-methods",
  },
  {
    id: 4,
    text: "Confirmation",
    path: "/checkout/confirmation",
  },
  {
    id: 5,
    text: "Complete",
    path: "/checkout/complete",
  },
];

export const CustomerSearchInputFields: TFilterInputField = [
  {
    id: 1,
    placeholder: "Filter by email...",
    columnAccessor: "email",
  },
  {
    id: 2,
    placeholder: "Filter by first name...",
    columnAccessor: "name_firstName",
  },
];
