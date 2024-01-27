import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PRINT = (result: any) => {
  // console.log(new Date().toLocaleTimeString(), " : ", result, "\n");
};
