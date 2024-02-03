import { TVatCountrySchema } from "../_utils/types/types";
import VatInfoUpdate from "../_utils/components/update-form";

const Page = ({ searchParams }: { searchParams: TVatCountrySchema }) => {
  return (
    <div>
      <VatInfoUpdate defaultFormData={searchParams} />
    </div>
  );
};

export default Page;
