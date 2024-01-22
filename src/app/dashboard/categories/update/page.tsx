import { Suspense } from "react";
import { GetCategory } from "../_utils/actions/actions";

const UpdateForm = async ({ _id }: { _id: string }) => {
  const result = await GetCategory(_id);
  console.log(result);
  return result.success
    ? // <CategoryUpdateForm defaultFormData={result.data.category} />
      null
    : "No data found!";
};

const Page = ({ searchParams }: { searchParams: { _id: string } }) => {
  return (
    <div>
      <div>
        <h3 className="text-[16px] md:text-[20px] font-semibold">
          Update Category Data
        </h3>
        <span className="text-gray-400">#{searchParams._id}</span>
      </div>
      <Suspense fallback="Form data loading...">
        <UpdateForm _id={searchParams._id} />
      </Suspense>
    </div>
  );
};

export default Page;
