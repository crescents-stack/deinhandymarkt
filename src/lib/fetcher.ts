const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const POST = async (url: string, body: any) => {
  try {
    const response = await fetch(BASE_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer TOKEN",
      },
      body: JSON.stringify(body),
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export const GET = async (url: string) => {
  try {
    const response = await fetch(BASE_URL + url, {
      next: {
        revalidate: 10,
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
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
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export const DELETE = async (url: string, body: any) => {
  try {
    const response = await fetch(BASE_URL + url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer TOKEN",
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
