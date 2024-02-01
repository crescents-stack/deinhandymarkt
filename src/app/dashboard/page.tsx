// import OrdersFrom from "@/app/dashboard/_utils/components/orders-from";
// import OrdersState from "@/app/dashboard/_utils/components/orders-state";
// import ProductsTopSell from "@/app/dashboard/_utils/components/products-top-sell";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
  const Links = [
    {
      id: 1,
      text: "Settings",
      link: "/dashboard/settings",
    },
    {
      id: 2,
      text: "Orders",
      link: "/dashboard/orders",
    },
    {
      id: 3,
      text: "Products",
      link: "/dashboard/products",
    },
    {
      id: 4,
      text: "Customers",
      link: "/dashboard/customers",
    },
    {
      id: 5,
      text: "Categories",
      link: "/dashboard/categories",
    },
  ];
  return (
    <div>
      <div className="flex flex-wrap gap-8">
        {Links.map((item: any) => {
          return (
            <Link href={item.link} key={item.id}>
              <div className="flex items-center gap-1 group py-8 px-16 rounded-[10px] bg-white min-w-[150px] hover:shadow-xl border-2 border-muted hover:border-secondary transition ease-in-out duration-500">
                <p className="text-[14px] md:text-[16px] group-hover:text-secondary">
                  {item.text}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      {/* <h3 className="text-[20px] md:text-[24px] font-semibold">
        Shop state today
      </h3>
      <OrdersState />
      <ProductsTopSell />
      <OrdersFrom /> */}
    </div>
  );
};

export default Dashboard;
