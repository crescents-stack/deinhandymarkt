import { toast } from "@/components/ui/use-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const POST = async (url: string, body: any, setLoading: Function) => {
  setLoading(true);

  const response = await fetch(BASE_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer TOKEN",
    },
    body: JSON.stringify(body),
  });
  await response.json().then((result: any) => {
    if (result.data) {
      localStorage.setItem(url, JSON.stringify(result.data));
    }
    if (result.success) {
      ResponseSuccessHandler(result);
    } else {
      ResponseErrorHandler(result);
    }
  });
  setLoading(false);
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
