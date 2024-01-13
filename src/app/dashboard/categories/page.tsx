import AllCategories from "@/components/pages/dashboard/category/datatable";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div>
      <AllCategories searchParams={searchParams} />
    </div>
  );
};

export default Page;
