"use server";

import { BASEURL } from "@/lib/data";


export const UpdateSameDayShippingTime = async (
  values: { _id: string; date: string }
  //   token: string
) => {
  try {
    const response = await fetch(`${BASEURL}/random-contents/${values._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ randomValues: [values.date] }), // Access data from the request body
    });
    const result = await response.json();
    return result;
  } catch (error) {
    ;
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const GetSameDayShippingTime = async () => {
  try {
    // const ID = "65c39864655049caefc7df58";
    const response = await fetch(`${BASEURL}/random-contents`);
    const result = await response.json();
    // console.table(result.data.filter((item: any) => item._id === ID)[0].date);
    return result;
  } catch (error) {
    ;
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};
