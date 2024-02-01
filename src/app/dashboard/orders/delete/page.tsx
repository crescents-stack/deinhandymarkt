import DeleteForm from "@/components/molecules/delete-form";
import { DeleteOrder } from "../_utils/actions/actions";

const Page = ({ searchParams }: { searchParams: { _id: string } }) => {
  return (
    <DeleteForm
      _id={searchParams._id}
      title="Order deletion"
      deletor={DeleteOrder}
      backlink="/dashboard/orders"
    />
  );
};

export default Page;
