/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { ReactChildren } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthLoader from "./authenticating-loader";

const PublicRouter = ({ children }: ReactChildren) => {
  const Router = useRouter();
  const { auth } = useAuthContext();
  useEffect(() => {
    if (auth) {
      Router.push("/dashboard");
    }
  }, [auth]);
  return !auth ? children : <AuthLoader />;
};

export default PublicRouter;
