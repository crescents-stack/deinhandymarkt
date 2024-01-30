import CustomerAccountBlockForm from "../_utils/components/block-form";

const Page = ({
  searchParams,
}: {
  searchParams: { _id: string; status: "blocked" | "active" | "pending" };
}) => {
  return (
    <CustomerAccountBlockForm
      _id={searchParams._id}
      status={searchParams.status}
    />
  );
};

export default Page;
