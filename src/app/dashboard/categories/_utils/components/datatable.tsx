import UnderDevelopToolTip from "@/components/molecules/under-develop-tooltip";
import { Plus } from "lucide-react";
import Link from "next/link";

const AllCategories = () => {
  return (
    <div className="w-full overflow-auto">
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between gap-[5px] pt-[24px] pb-[12px]">
          <h4 className="font-semibold text-[16px] md:text-[20px]">
            Manage categories
          </h4>
          <div className="flex flex-wrap items-center gap-[8px]">
            <UnderDevelopToolTip>
              <form>
                <div className="min-w-[250px] flex items-center justify-start gap-[8px] p-[8px] rounded-[10px] border border-dark_gray">
                  {/* <Search className="w-[16px] h-[16px] storke-[1.3px] stroke-dark_gray" /> */}
                  <input
                    className="px-[16]"
                    placeholder="Search with product name"
                  />
                </div>
              </form>
            </UnderDevelopToolTip>
            <Link
              className="px-[6px] py-[5.5px] rounded-[10px] hover:bg-muted flex items-center justify-center border border-dark_gray"
              href="/dashboard/categories/add"
            >
              <Plus className="stroke-[1px] stroke-gray-500" />
            </Link>
          </div>
        </div>
        table
      </div>
    </div>
  );
};

export default AllCategories;
