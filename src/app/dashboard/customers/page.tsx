import { DataTable } from "@/components/ui/datatable";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table";
import { GetCustomers } from "./_utils/actions/actions";
import AddRouter from "@/components/atoms/add-router";
import { columns } from "./_utils/components/columns";

const Table = async () => {
  const result = await GetCustomers();
  // console.log(result)
  // return null;
  return result.success ? (
    <DataTable columns={columns} data={result.data} addButton={<AddRouter link="/dashboard/customers/add" />}/>
  ) : (
    <div className="space-y-10">
      <p>Something went wrong!</p>
    </div>
  );
};

export default async function DemoPage() {
  return (
    <div className="mx-auto">
      <h2 className="text-[16px] md:text-[20px] font-semibold mb-10">
        Customers
      </h2>
      <Suspense fallback={<TableSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
}
