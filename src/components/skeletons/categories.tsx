const AllCategoriesSkeleton = () => {
  return (
    <div className="w-full overflow-auto">
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tableRow) => {
          return (
            <div key={tableRow}>
              {[1, 2, 3, 4].map((tdata: any) => {
                return (
                  <div key={tdata} className="px-[16px] py-[4px]">
                    <Skeleton />
                  </div>
                );
              })}
              <div className="px-[16px] py-[4px]">
                <div className="inline-flex gap-[8px]">
                  <Skeleton /> <Skeleton />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCategoriesSkeleton;

export const Skeleton = () => {
  return (
    <div className="bg-gray-200 animate-pulse rounded-[10px] h-10 w-[250px]"></div>
  );
};

const tableHead = [
  {
    id: 1,
    th: "Category ID",
    key: "category_id",
  },
  {
    id: 2,
    th: "Name",
    key: "name",
  },
  {
    id: 3,
    th: "Slug",
    key: "slug",
  },
  {
    id: 4,
    th: "Icon",
    key: "icon",
  },
  {
    id: 5,
    th: "ParentID",
    key: "parent_id",
  },
  {
    id: 6,
    th: "blog",
    key: "blog",
  },
  {
    id: 7,
    th: "Status",
    key: "status",
  },
  {
    id: 8,
    th: "Tags",
    key: "tags",
  },
  {
    id: 9,
    th: "Metadata",
    key: "metadata",
  },
  {
    id: 10,
    th: "Created",
    key: "createdAt",
  },
  {
    id: 11,
    th: "Last update",
    key: "updatedAt",
  },
  {
    id: 12,
    th: "Action",
    key: "action",
  },
];
