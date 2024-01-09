import OrdersState from "@/components/pages/dashboard/home/orders-state";
import AllOrders from "@/components/pages/dashboard/orders/all-orders";
import RecentOrders from "@/components/pages/dashboard/orders/recent-orders";

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
