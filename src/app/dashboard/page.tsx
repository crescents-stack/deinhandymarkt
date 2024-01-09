import OrdersFrom from "@/components/pages/dashboard/home/orders-from";
import OrdersState from "@/components/pages/dashboard/home/orders-state";
import ProductsTopSell from "@/components/pages/dashboard/home/products-top-sell";

const Dashboard = () => {
  return (
    <div className="max-w-[700px]">
      <h3 className="text-[20px] md:text-[24px] font-semibold">
        Shop state today
      </h3>
      <OrdersState />
      <ProductsTopSell />
      <OrdersFrom />
    </div>
  );
};

export default Dashboard;
