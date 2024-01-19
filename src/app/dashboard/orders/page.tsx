import OrdersState from "@/app/dashboard/_utils/components/orders-state";
import AllOrders from "@/app/dashboard/orders/_utils/components/all-orders";
import RecentOrders from "@/app/dashboard/orders/_utils/components/recent-orders";

const Page = () => {
  return (
    <div>
      <h3 className="text-[20px] md:text-[24px] font-semibold">
        Order state today
      </h3>
      <OrdersState />
      <RecentOrders />
      <AllOrders />
    </div>
  );
};

export default Page;
