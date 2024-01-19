import AllCategories from "@/app/dashboard/categories/_utils/components/datatable";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return <AllCategories />;
};

export default Page;
