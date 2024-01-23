
import DeleteForm from "@/components/molecules/delete-form";
import { DeleteCategory } from "../_utils/actions/actions";

const Page = ({ searchParams }: { searchParams: { _id: string } }) => {
  return (
      <DeleteForm _id={searchParams._id} title="Category deletion" deletor={DeleteCategory} backlink="/dashboard/categories"/>
  );
};

export default Page;
