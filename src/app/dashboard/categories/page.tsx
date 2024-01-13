import AllCategories from "@/components/pages/dashboard/category/datatable";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return <AllCategories searchParams={searchParams} />;
};

export default Page;
