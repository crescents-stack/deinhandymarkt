import { columns } from "./_utils/components/columns";
import { DataTable } from "@/components/ui/datatable";
import { GetVats } from "./_utils/actions/actions";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table";
import AppRouter from "../../../components/atoms/add-router";
import { ActionResponseHandler } from "@/lib/error";

const Table = async () => {
  const result = await GetVats();
  ActionResponseHandler(result, "Category data", true);
  return result.success ? (
    <DataTable
      columns={columns}
      data={result.data}
      addButton={<AppRouter link="/dashboard/vat/add" text="Add new country"/>}
    />
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
        Country list with VAT amount in %
      </h2>
      <Suspense fallback={<TableSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
}
