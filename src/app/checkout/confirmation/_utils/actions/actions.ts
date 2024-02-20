"use server";

import { BASEURL } from "@/lib/data";

export const GetLocationBaseVatWithIPAPI = async (
  amount: number,
  land: string
) => {
  try {
    // const response = await fetch("https://ipinfo.io/json", {
    //   cache: "no-store",
    // });
    // const result = await response.json();
    const getVatAmount = await fetch(`${BASEURL}/vat`, {
      cache: "no-store",
    });
    const vatsResult = await getVatAmount.json();
    console.log(vatsResult);
    const countries = vatsResult.data.map((item: { countryName: string }) =>
      item.countryName.toLowerCase()
    );
    // console.table(result);
    if (countries.includes(land.toLowerCase())) {
      const selectedVat = vatsResult.data.filter(
        (item: { countryName: string; vatAmountInPercent: number }) =>
          item.countryName.toLowerCase() == land.toLowerCase()
      );
      // console.log(selectedVat)
      if (selectedVat.length) {
        return (selectedVat[0].vatAmountInPercent * amount) / 100;
      }
    } else {
      const selectedVat = vatsResult.data.filter(
        (item: { countryName: string; vatAmountInPercent: string }) =>
          item.countryName.toLowerCase() === "any"
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
