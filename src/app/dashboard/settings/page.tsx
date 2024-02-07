/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { useEffect, useState } from "react";
import { GetCustomer } from "../customers/_utils/actions/actions";
import { PRINT } from "@/lib/utils";
import {
  TSingleUserSchema,
  // TUserSchema,
} from "../customers/_utils/types/types";
// import Quote from "@/components/assets/billing/quote";
// import BookUser from "@/components/assets/billing/book-user";
// import Printer from "@/components/assets/billing/printer";
// import PhoneCall from "@/components/assets/billing/phone-call";
// import Mail from "@/components/assets/billing/mail";
// import UserRound from "@/components/assets/billing/user-round";
// import BillingDetailsForm from "./_utils/components/billing-details-form";
// import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/skeletons/table";
import SameDayShippingTimeForm from "./_utils/components/same-day-shipping-time-form";

const Page = () => {
  const { auth } = useAuthContext();
  const [customerData, setCustomerData] = useState<TSingleUserSchema | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const FetchCustomerData = async (_id: string) => {
    setLoading(true);
    try {
      const response = await GetCustomer(_id);
      if (response.success) {
        setCustomerData(response.data);
      }
    } catch (error) {
      PRINT(error);
    }
    setLoading(false);
  };
  PRINT(customerData);
  useEffect(() => {
    auth?.uid && FetchCustomerData(auth?.uid as string);
  }, []);

  PRINT(customerData);
  // const handleSubmit = () => {
  //   PRINT(customerData);
  // };
  return (
    <div className="space-y-8">
      {loading ? (
        <div>
          <Skeleton className="w-[300px] h-[200px]" />
        </div>
      ) : (
        <div>
          {customerData ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 md:gap-8">
                <div className="col-span-2 lg:col-span-1 space-y-4 p-8 rounded-[10px] bg-white border-[2px] border-secondary">
                  <h4 className="text-[14px] md:text-[16px] font-semibold">
                    Profile overview
                  </h4>
                  <p>
                    Name:&nbsp;
                    {customerData?.uid?.name?.firstName}&nbsp;
                    {customerData?.uid?.name?.lastName}
                  </p>
                  <p>Email address:&nbsp;{customerData?.uid?.email}</p>
                  <p>Account role:&nbsp;{customerData?.role}</p>
                  <p>Account status:&nbsp;{customerData?.status}</p>
                  <Link
                    href={{
                      pathname: "/dashboard/customers/update",
                      query: {
                        _id: customerData?.uid?._id as string,
                        from: "/dashboard/settings",
                      },
                    }}
                    className="flex items-center gap-1 group [&>*]:hover:text-secondary transition ease-in-out duration-300"
                  >
                    <p>Update overview</p>
                    <ArrowUpRight className="w-4 h-4 translate-x-0 group-hover:translate-x-4 group-hover:stroke-secondary transition ease-in-out duration-300" />
                  </Link>
                </div>
                {auth?.role === "admin" ? <SameDayShippingTimeForm /> : null}
                {/* <div className="col-span-2 flex flex-col gap-8">
                  <BillingDetailsForm
                    defaultValues={customerData?.uid?.billingAddress}
                    customerData={customerData}
                    setCustomerData={setCustomerData}
                    name="billingAddress"
                  />
                  <BillingDetailsForm
                    defaultValues={customerData?.uid?.shippingAddress}
                    customerData={customerData}
                    setCustomerData={setCustomerData}
                    name="shippingAddress"
                  />
                </div> */}
              </div>
              {/* <div className="px-8 py-4 flex justify-end rounded-[10px] bg-white mt-8">
                <Button onClick={handleSubmit} className="w-[100px]">
                  Save
                </Button>
              </div> */}
            </>
          ) : (
            "No data found!"
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
