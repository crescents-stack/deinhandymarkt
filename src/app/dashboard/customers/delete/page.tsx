import DeleteForm from "@/components/molecules/delete-form";
import { DeleteCustomer } from "../_utils/actions/actions";

const Page = ({ searchParams }: { searchParams: { _id: string } }) => {
  return (
      <DeleteForm _id={searchParams._id} title="Customer deletion" deletor={DeleteCustomer} backlink="/dashboard/customers"/>
  );
};

export default Page;