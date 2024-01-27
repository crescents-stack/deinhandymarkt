import { Suspense } from "react";
import { GetProduct } from "../_utils/actions/actions";
import ProductUpdateForm from "../_utils/components/product-update-form";

const UpdateForm = async ({ slug }: { slug: string }) => {
  const result = await GetProduct(slug);
  // PRINT(result.data);
  return result.success && result?.data ? (
    <ProductUpdateForm defaultFormData={result?.data || {}} />
  ) : (
    "No data found!"
  );
};

const Page = ({ searchParams }: { searchParams: { slug: string } }) => {
  return (
    <div>
      <div>
        <h3 className="text-[16px] md:text-[20px] font-semibold pb-10">
          Update Product Data
        </h3>
      </div>
      <Suspense fallback="Form data loading...">
        <UpdateForm slug={searchParams.slug} />
      </Suspense>
    </div>
  );
};

export default Page;
