"use client";

import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import clsx from "clsx";
import { UserCircle } from "lucide-react";
import Link from "next/link";

const AccountLink = ({ white }: { white: boolean }) => {
  const { auth } = useAuthContext();
  return (
    <Link
      href="/dashboard/settings"
      className="flex flex-end items-center gap-[8px] group"
    >
      <span
        className={clsx({
          "text-white group-hover:text-muted": white,
          "text-dark group-hover:text-secondary": !white,
        })}
      >
        {auth?.email?.split("@")[0] || "John Doe"}
      </span>
      <UserCircle
        className={clsx(
          "stroke-[1.3px] w-[16px] h-[16px] md:w-[24px] md:h-[24px]",
          {
            "stroke-white group-hover:stroke-muted": white,
            "stroke-dark group-hover:stroke-secondary": !white,
          }
        )}
      />
    </Link>
  );
};

export default AccountLink;
