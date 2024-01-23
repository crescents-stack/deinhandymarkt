import { DataTable } from "@/components/ui/datatable";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table";
import AddRouter from "@/components/atoms/add-router";
// import { GetProducts } from "./_utils/actions/actions";
import { productColumns } from "./_utils/components/columns";
import { DummyProducts } from "./_utils/types/types";
// import { TProductSchema, product } from "./_utils/types/types";

const Table = async () => {
  // const result = await GetProducts();
  // return null;

  return <DataTable columns={productColumns} data={DummyProducts} addButton={<AddRouter link="/dashboard/products/add" />}/>;
  // return result.success ? (
    
  // ) : (
  //   <div className="space-y-10">
  //     <p>Something went wrong!</p>
  //   </div>
  // );
  // return null
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
