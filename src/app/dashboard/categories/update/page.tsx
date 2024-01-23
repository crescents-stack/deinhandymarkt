import { Suspense } from "react";
import { GetCategory } from "../_utils/actions/actions";
import CategoryUpdateForm from "../_utils/components/update-form";

const UpdateForm = async ({ slug }: { slug: string }) => {
  const result = await GetCategory(slug);
  // console.log(result.data);
  return result.success ? (
    <CategoryUpdateForm defaultFormData={result.data} />
  ) : (
    "No data found!"
  );
};

const Page = ({ searchParams }: { searchParams: { slug: string } }) => {
  return (
    <div>
      <div>
        <h3 className="text-[16px] md:text-[20px] font-semibold">
          Update Category Data
        </h3>
        <span className="text-gray-400">#{searchParams.slug}</span>
      </div>
      <Suspense fallback="Form data loading...">
        <UpdateForm slug={searchParams.slug} />
      </Suspense>
    </div>
  );
};

export default Page;
