/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { useEffect, useState } from "react";
import { GetCustomer } from "../customers/_utils/actions/actions";
import { PRINT } from "@/lib/utils";
import { TUserSchema } from "../customers/_utils/types/types";

const Page = () => {
  const { auth } = useAuthContext();
  const [customerData, setCustomerData] = useState<TUserSchema | null>(null);
  const [loading, setLoading] = useState(false);
  const FetchCustomerData = async (_id: string) => {
    setLoading(true);
    try {
      const response = await GetCustomer(_id);
      if (response.success) {
        setCustomerData(response.data);
      }
    } catch (error) {
      PRINT(error);
    }
    setLoading(false)
  };
  PRINT(customerData);
  useEffect(() => {
    auth?.uid && FetchCustomerData(auth?.uid as string);
  }, []);
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {customerData ? (
            <div>{customerData?.uid?.email}</div>
          ) : (
            "No data found!"
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
