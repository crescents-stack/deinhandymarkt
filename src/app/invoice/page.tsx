import { ActionResponseHandler } from "@/lib/error";
import { GetOrder } from "../dashboard/orders/_utils/actions/actions";
import InvoicePaper from "./_utils/invoice-paper";
import { Suspense } from "react";

const Invoice = async ({ _id }: { _id: string }) => {
  const result = await GetOrder(_id);
  if (result.status !== 200) {
    ActionResponseHandler(result, "Invoice data", true);
  }
  return result?.data ? (
    <InvoicePaper details={result.data} />
  ) : (
    "No data found!"
  );
};

const Page = ({ searchParams }: { searchParams: { _id: string } }) => {
  return (
    <section className="section container">
      <Suspense fallback={<>Loading...</>}>
        <Invoice _id={searchParams._id} />
      </Suspense>
    </section>
  );
};

export default Page;
