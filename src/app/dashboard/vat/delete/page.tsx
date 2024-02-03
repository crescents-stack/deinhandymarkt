
import DeleteForm from "@/components/molecules/delete-form";
import { DeleteVat } from "../_utils/actions/actions";

const Page = ({ searchParams }: { searchParams: { _id: string } }) => {
  return (
      <DeleteForm _id={searchParams._id} title="Vat info deletion" deletor={DeleteVat} backlink="/dashboard/vat"/>
  );
};

export default Page;
