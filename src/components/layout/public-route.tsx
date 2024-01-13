"use client";

import { useUserContext } from "@/lib/contexts/user.provider";
import { ReactChildren } from "@/lib/types";
import { redirect, usePathname } from "next/navigation";
import AuthLoader from "./authenticating-loader";

const PrivateRoute = ({ children }: ReactChildren) => {
  const { UserData } = useUserContext();
  const pathname = usePathname();

  typeof localStorage !== "undefined" &&
    localStorage.setItem("fromLocation", pathname);
  UserData?.accessToken && redirect("/dashboard");

  return !UserData?.accessToken ? children : <AuthLoader />;
};

export default PrivateRoute;
