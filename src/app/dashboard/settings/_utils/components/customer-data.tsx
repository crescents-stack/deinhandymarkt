import { GetCustomer } from "@/app/dashboard/customers/_utils/actions/actions";
import { Suspense } from "react";


const Data = async ({_id}: {_id: string}) => {
  const response = await GetCustomer(_id);
  console.log(response);
  return null;
}

const CustomerData = ({_id}: {_id: string}) => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Data _id={_id} />
    </Suspense>
  )
}

export default CustomerData;