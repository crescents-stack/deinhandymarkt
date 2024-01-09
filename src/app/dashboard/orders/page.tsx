import OrdersState from "@/components/pages/dashboard/home/orders-state";

const Page = () => {
  return (
    <div>
      <h3 className="text-[20px] md:text-[24px] font-semibold">
        Order state today
      </h3>
      <OrdersState />
    </div>
  );
};

export default Page;
