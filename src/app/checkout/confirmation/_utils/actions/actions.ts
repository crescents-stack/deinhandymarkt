"use server";

import { BASEURL } from "@/lib/data";

export const GetLocationBaseVatWithIPAPI = async (amount: number) => {
  try {
    const response = await fetch("http://ip-api.com/json/", {
      cache: "no-store",
    });
    const result = await response.json();
    const getVatAmount = await fetch(`${BASEURL}/vat`, {
      cache: "no-store",
    });
    const vatsResult = await getVatAmount.json();
    const countryCodes = vatsResult.data.map(
      (item: { countryCode: string }) => item.countryCode
    );
    // console.table(result);
    if (countryCodes.includes(result.countryCode)) {
      const selectedVat = vatsResult.data.filter(
        (item: { countryCode: string; vatAmountInPercent: number }) =>
          item.countryCode.toLowerCase() == result.countryCode.toLowerCase()
      );
      // console.log(selectedVat)
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
