"use server";

import { revalidateTag, unstable_noStore } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const GetCategories = async () => {
  try {
    unstable_noStore()
    const response = await fetch(BASE_URL + "/category", {
      next: { tags: ["category-all"] },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const PostCategory = async (body: any) => {
  try {
    const response = await fetch(BASE_URL + "/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //   authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    console.log(result, "<---");
    revalidateTag("category_all");
    return result;
  } catch (error) {
    console.log(error);
  }
};
