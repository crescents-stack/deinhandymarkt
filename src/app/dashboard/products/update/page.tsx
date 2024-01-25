import { Suspense } from "react";
import { GetProduct } from "../_utils/actions/actions";
import ProductUpdateForm from "../_utils/components/product-update-form";

const UpdateForm = async ({ slug }: { slug: string }) => {
  const result = await GetProduct(slug);
  // console.log(result.data);
  return result.success && result?.data?.data ? (
    <ProductUpdateForm defaultFormData={result?.data?.data || {}} />
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
        <span className="text-gray-400">{searchParams.slug}</span>
      </div>
      <Suspense fallback="Form data loading...">
        <UpdateForm slug={searchParams.slug} />
      </Suspense>
    </div>
  );
};

export default Page;
