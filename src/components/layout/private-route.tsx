"use client";

import { useUserContext } from "@/lib/contexts/user.provider";
import { ReactChildren } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthLoader from "./authenticating-loader";

const PrivateRoute = ({ children }: ReactChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const { UserData } = useUserContext();

  useEffect(() => {
    // console.log(UserData)
    if (!UserData?.accessToken) {
      localStorage.setItem("from_location", pathname);
      router.push("/auth/login");
    }
  }, [UserData]);
  return UserData?.accessToken ? children : <AuthLoader />;
};

export default PrivateRoute;
