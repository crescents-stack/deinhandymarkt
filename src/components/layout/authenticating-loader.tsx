"use client";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import clsx from "clsx";
import { Sun } from "lucide-react";

const AuthLoader = () => {
  const { auth } = useAuthContext();
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 min-w-[100vw] min-h-[100vh] bg-white flex items-center justify-center",
        {
          "scale-0": auth?.accessToken,
          "scale-100": !auth?.accessToken,
        }
      )}
    >
      <div className="flex items-center gap-[8px]">
        <Sun className="w-[16px] h-[16px] animate-spin stroke-gray-500" />
        <span className="text-gray-500">Authenticating</span>
      </div>
    </div>
  );
};

export default AuthLoader;
