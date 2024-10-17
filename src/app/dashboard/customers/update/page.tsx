import { Suspense } from "react";
import { GetCustomer } from "../_utils/actions/actions";
import CustomerUpdateForm from "../_utils/components/update-form";


const UpdateForm = async ({ _id, from }: { _id: string, from?: string }) => {
  const result = await GetCustomer(_id);
  PRINT(result.data);
  return result.success ? (
    <CustomerUpdateForm defaultFormData={result.data} from={from}/>
  ) : (
    "No data found!"
  );
};

const Page = ({ searchParams }: { searchParams: { _id: string, from?: string } }) => {
  return (
    <div className="bg-white p-8 rounded-[10px] max-w-[450px] ">
      <div>
        <h3 className="text-[16px] md:text-[20px] font-semibold">
          Update Customer Data
        </h3>
        {/* <span className="text-gray-400">{searchParams._id}</span> */}
      </div>
      <Suspense fallback="Form data loading...">
        <UpdateForm _id={searchParams._id} from={searchParams.from}/>
      </Suspense>
    </div>
  );
};

export default Page;
