import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const POST = async (url: string, body: any, setLoading: Function) => {
  setLoading(true);
  try {
    const response = await fetch(BASE_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer TOKEN",
      },
      body: JSON.stringify(body),
    });
    ResponseSuccessHandler(response);
    setLoading(false);
  } catch (error) {
    ResponseErrorHandler(error);
    setLoading(false);
  }
};
export const GET = async (url: string) => {
  try {
    const response = await fetch(BASE_URL + url, {
      next: {
        revalidate: 10,
      },
    });
    ResponseSuccessHandler(response);
  } catch (error) {
    ResponseErrorHandler(error);
  }
};
export const UPDATE = async (url: string, body: any) => {
  try {
    const response = await fetch(BASE_URL + url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer TOKEN",
      },
      body: JSON.stringify(body),
    });
    ResponseSuccessHandler(response);
  } catch (error) {
    ResponseErrorHandler(error);
  }
};
export const DELETE = async (url: string) => {
  try {
    const response = await fetch(BASE_URL + url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer TOKEN",
      },
    });
    ResponseSuccessHandler(response);
  } catch (error) {
    ResponseErrorHandler(error);
  }
};

const ResponseErrorHandler = (error: any) => {
  // console.log(JSON.parse(error));
  toast("Failed!", {
    description: "Sunday, December 03, 2023 at 9:00 AM",
  });
};

const ResponseSuccessHandler = (response: any) => {
  console.log(JSON.parse(response));
  toast("Success!", {
    description: "Sunday, December 03, 2023 at 9:00 AM",
  });
};
