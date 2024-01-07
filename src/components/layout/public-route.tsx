"use client";

import { useUserContext } from "@/lib/contexts/user.provider";
import { ReactChildren } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthLoader from "./authenticating-loader";

const PublicRoute = ({ children }: ReactChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const { UserData } = useUserContext();
  useEffect(() => {
    if (UserData?.accessToken) {
      localStorage.setItem("from_location", pathname);
      router.push("/dashboard");
    }
  }, [UserData]);
  return !UserData?.accessToken ? children : <AuthLoader />;
};

export default PublicRoute;
