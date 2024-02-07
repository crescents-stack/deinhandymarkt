/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { DataTable } from "@/components/ui/datatable";
import { useEffect, useState } from "react";
import { columns } from "./_utils/components/columns";
import { GetOrders } from "./_utils/actions/actions";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { ActionResponseHandler } from "@/lib/error";
import { PRINT } from "@/lib/utils";
import TableSkeleton from "@/components/skeletons/table";

export default function Page() {
  const [data, setData] = useState([]);
  const { auth } = useAuthContext();
  const [loader, setLoader] = useState(true);
  const FetchData = async () => {
    try {
      const result = await GetOrders(auth);
      ActionResponseHandler(result, "Orders data", true);
      PRINT(result);
      if (result.success) {
        setData(auth?.role === "admin" ? result?.data?.data : result?.data);
      }
      setLoader(false);
    } catch (error) {
      ActionResponseHandler(
        { sucess: false, message: "Something went wrong!" },
        "Orders data",
        true
      );
      setLoader(false);
    }
  };
  useEffect(() => {
    FetchData();
  }, [auth]);
  return loader ? (
    <TableSkeleton />
  ) : (
    <div className="mx-auto">
      <h2 className="text-[16px] md:text-[20px] font-semibold mb-10">Orders</h2>
      <DataTable
        columns={columns}
        data={
          auth?.role === "admin"
            ? data
            : data.map((item, index) => data[data.length - 1 - index])
        }
        // addButton={<AddCategory link="/dashboard/categories/add" text="Add new category"/>}
      />
    </div>
  );
}
