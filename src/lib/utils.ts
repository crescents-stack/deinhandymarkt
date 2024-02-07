import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BASEURL } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const PRINT = (result: any) => {
  // console.log(new Date().toLocaleTimeString(), " : ", result, "\n");
};

// Create our number formatter.
export const IntlFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const GetLocationBaseVatWithIPAPI = async (amount: number) => {
  try {
    ("use server");
    const response = await fetch("http://ip-api.com/json/");
    const result = await response.json();
    const getVatAmount = await fetch(`${BASEURL}/vat`);
    const vatsResult = await getVatAmount.json();
    const countryCodes = vatsResult.data.map(
      (item: { countryCode: string }) => item.countryCode
    );
    console.table(result);
    if (countryCodes.includes(result.countryCode)) {
      const selectedVat = vatsResult.data.filter(
        (item: { countryCode: string; vatAmountInPercent: number }) =>
          item.countryCode == result.countryCode
      );
      if (selectedVat.length) {
        return (selectedVat[0].vatAmountInPercent * amount) / 100;
      }
    } else {
      const selectedVat = vatsResult.data.filter(
        (item: { countryCode: string; vatAmountInPercent: string }) =>
          item.countryCode === "Any"
      );
      if (selectedVat.length) {
        return (selectedVat[0].vatAmountInPercent * amount) / 100;
      }
    }
    return 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
