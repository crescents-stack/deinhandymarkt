import { toast } from "@/components/ui/use-toast";
import { FetchReturnType } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
let returnValue: FetchReturnType = {
  success: false,
  message: "",
  data: "",
  statusCode: 404,
};

// Universal API POST Function
export const POST = async (url: string, body: any, setLoading: Function) => {
  setLoading(true); // starting loader

  const response = await fetch(BASE_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(body),
  });
  // response handle
  await response.json().then((result: any) => {
    if (result.success) {
      returnValue = result;
    }
    // saving response data
    if (result.data) {
      localStorage.setItem(url, JSON.stringify(result.data));

      // saving access token
      if (result.data.accessToken) {
        localStorage.setItem("accessToken", result.data.accessToken);
      }
    }
    // success/error handler
    if (result.success) {
      ResponseSuccessHandler(result);
    } else {
      ResponseErrorHandler(result);
    }
  });
  setLoading(false); // ending loader
  return returnValue;
};
export const GET = async (url: string, header: any) => {
  try {
    const response = await fetch(BASE_URL + url, header).then((res: any) =>
      res.json()
    );
    // ResponseSuccessHandler(response);
    returnValue = response;
  } catch (error) {
    ResponseErrorHandler(error);
  }

  return returnValue;
};

// Universal API PATCH Function
export const UPDATE = async (url: string, body: any, setLoading: Function) => {
  let returnValue = null;
  setLoading(true); // starting loader
  const token = localStorage.getItem("accessToken");
  console.log(body, "--", token);
  if (token) {
    const response = await fetch(BASE_URL + url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(body),
    });
    // response handle
    await response.json().then((result: any) => {
      returnValue = result;
      // saving response data
      if (result.data) {
        localStorage.setItem(url, JSON.stringify(result.data));
      }
      // success/error handler
      if (result.success) {
        ResponseSuccessHandler(result);
      } else {
        ResponseErrorHandler(result);
      }
    });
  } else {
    console.log("Token not found!");
  }
  setLoading(false); // ending loader
  return returnValue;
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
  // console.log(error)
  const paths = error.errorMessages.length
    ? error.errorMessages.map((item: any) => {
        return ` '${item.path}': ${item.message}\n`;
      })
    : "";
  // console.log(paths)
  toast({
    title: "Something went wrong!",
    description: error.message + paths,
    variant: "destructive",
  });
};

const ResponseSuccessHandler = (response: any) => {
  toast({
    title: "Successful!",
    description: response.message,
  });
};
