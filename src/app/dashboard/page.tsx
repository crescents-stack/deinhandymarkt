import OrdersFrom from "@/app/dashboard/_utils/components/orders-from";
import OrdersState from "@/app/dashboard/_utils/components/orders-state";
import ProductsTopSell from "@/app/dashboard/_utils/components/products-top-sell";

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
