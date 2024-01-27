import { Suspense } from "react";
import { GetCustomer } from "../_utils/actions/actions";
import CustomerUpdateForm from "../_utils/components/update-form";
import { PRINT } from "@/lib/utils";

const UpdateForm = async ({ _id }: { _id: string }) => {
  const result = await GetCustomer(_id);
  PRINT(result.data);
  return result.success ? (
    <CustomerUpdateForm defaultFormData={result.data} />
  ) : (
    "No data found!"
  );
};

const Page = ({ searchParams }: { searchParams: { _id: string } }) => {
  return (
    <div>
      <div>
        <h3 className="text-[16px] md:text-[20px] font-semibold">
          Update Customer Data
        </h3>
        {/* <span className="text-gray-400">{searchParams._id}</span> */}
      </div>
      <Suspense fallback="Form data loading...">
        <UpdateForm _id={searchParams._id} />
      </Suspense>
    </div>
  );
};

export default Page;
