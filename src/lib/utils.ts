import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PRINT = (result: any) => {
  // PRINT(new Date().toLocaleTimeString(), " : ", result, "\n");
};
