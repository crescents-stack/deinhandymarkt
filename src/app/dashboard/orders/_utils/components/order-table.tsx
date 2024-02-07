
import { DataTable } from "@/components/ui/datatable";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table";
import { ActionResponseHandler } from "@/lib/error";
import { PRINT } from "@/lib/utils";
import { GetOrders } from "../actions/actions";
import { columns } from "./columns";

const Table = async ({token}: {token: string}) => {
  const result = await GetOrders(token);
  ActionResponseHandler(result, "Orders data", true);
  PRINT(result);
  // return null;
  return result.success ? (
    <DataTable
      columns={columns}
      data={result.data.data}
      // addButton={<AddCategory link="/dashboard/categories/add" text="Add new category"/>}
    />
  ) : (
    <div className="space-y-10">
      <p>Something went wrong!</p>
    </div>
  );
};

export default function OrderTable({token}: {token: string}) {
  return (
    <div className="mx-auto">
      <h2 className="text-[16px] md:text-[20px] font-semibold mb-10">Orders</h2>
      <Suspense fallback={<TableSkeleton />}>
        <Table token={token}/>
      </Suspense>
    </div>
  );
}