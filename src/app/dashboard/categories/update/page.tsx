import { Suspense } from "react";
import { GetCategory } from "../_utils/actions/actions";
import CategoryUpdateForm from "../_utils/components/update-form";

const UpdateForm = async ({ slug }: { slug: string }) => {
  const result = await GetCategory(slug);
  // PRINT(result.data);
  return result.success ? (
    <CategoryUpdateForm defaultFormData={result.data} />
  ) : (
    "No data found!"
  );
};

const Page = ({ searchParams }: { searchParams: { slug: string } }) => {
  return (
    <div>
      <Suspense fallback="Form data loading...">
        <UpdateForm slug={searchParams.slug} />
      </Suspense>
    </div>
  );
};

export default Page;
