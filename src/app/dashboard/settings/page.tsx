"use client";

import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import CustomerData from "./_utils/components/customer-data";

const Page = () => {
  const { auth } = useAuthContext();
  return (
    <div>
      Settings
      {auth?.uid ? <CustomerData _id={auth.uid} /> : null}
    </div>
  );
};

export default Page;
