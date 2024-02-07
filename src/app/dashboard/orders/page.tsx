/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { DataTable } from "@/components/ui/datatable";
import { useEffect, useState } from "react";
import { columns } from "./_utils/components/columns";
import { GetOrders } from "./_utils/actions/actions";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { ActionResponseHandler } from "@/lib/error";
import { PRINT } from "@/lib/utils";

export default function Page() {
  const [data, setData] = useState([]);
  const { auth } = useAuthContext();
  const FetchData = async () => {
    try {
      const result = await GetOrders(auth?.accessToken ?? "");
      ActionResponseHandler(result, "Orders data", true);
      PRINT(result);
      if (result.success) {
        setData(result.data.data);
      }
    } catch (error) {
      ActionResponseHandler(
        { sucess: false, message: "Something went wrong!" },
        "Orders data",
        true
      );
    }
  };
  useEffect(() => {
    FetchData();
  }, [auth]);
  return (
    <DataTable
      columns={columns}
      data={data}
      // addButton={<AddCategory link="/dashboard/categories/add" text="Add new category"/>}
    />
  );
}
