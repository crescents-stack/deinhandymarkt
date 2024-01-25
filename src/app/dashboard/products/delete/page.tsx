
import DeleteForm from "@/components/molecules/delete-form";
import { DeleteProduct } from "../_utils/actions/actions";

const Page = ({ searchParams }: { searchParams: { _id: string } }) => {
  return (
      <DeleteForm _id={searchParams._id} title="Category deletion" deletor={DeleteProduct} backlink="/dashboard/products"/>
  );
};

export default Page;
