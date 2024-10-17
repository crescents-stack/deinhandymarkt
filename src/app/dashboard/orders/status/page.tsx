
import OrderStatusUpdateForm from "../_utils/components/status-form";


const Page = ({
  searchParams,
}: {
  searchParams: { _id: string; status: 'pending' | 'hold' | 'processing' | 'packed' | 'shipped' | 'delivered' };
}) => {
    
  return (
    <OrderStatusUpdateForm
      _id={searchParams._id}
      status={searchParams.status}
    />
  );
};

export default Page;
