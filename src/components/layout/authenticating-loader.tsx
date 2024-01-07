"use client";
import { useUserContext } from "@/lib/contexts/user.provider";
import clsx from "clsx";
import { Sun } from "lucide-react";

const AuthLoader = () => {
  const { UserData } = useUserContext();
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 min-w-[100vw] min-h-[100vh] bg-white flex items-center justify-center",
        {
          "scale-0": UserData?.accessToken,
          "scale-100": !UserData?.accessToken,
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
